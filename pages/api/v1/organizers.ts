import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "PUT":
            try {
                let { eventId, username } = req.body

                const newUser = await prisma.appUserModel.findUniqueOrThrow({
                    where: { username },
                })

                const oldEvent = await prisma.eventModel.findUniqueOrThrow({
                    where: { id: eventId },
                    include: { organizers: true }
                })

                const isOrganizer = oldEvent.organizers.some(organizer => organizer.id === newUser.id)

                let updateData

                if (isOrganizer) {
                    // Remove the user from members
                    updateData = {
                        organizers: {
                            disconnect: { id: newUser.id },
                        },
                    }
                } else {
                    // Add the user to organizers
                    updateData = {
                        organizers: {
                            connect: { id: newUser.id },
                        },
                    }
                }

                const updatedEvent = await prisma.eventModel.update({
                    where: { id: eventId },
                    data: updateData,
                    include: {
                        organizers: true,
                        community: {
                            include: {
                                owner: true
                            }
                        },
                        comments: true,
                        participants: true,
                        highlightedImages: true
                    }
                })
                res.status(200).json(updatedEvent)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the organizers of the user", error: e })
            }
            break
        default:
            break
    }
}
