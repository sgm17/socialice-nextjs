import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "PUT":
            try {
                let { eventId, username } = req.body

                const newUser = await prisma.appUserModel.findUnique({
                    where: { username },
                })

                if (!newUser) return res.status(500).json({ message: "The user does not exist" })

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
                        participants: true,
                        community: {
                            include: {
                                owner: true,
                                members: true,
                                category: true,
                            }
                        },
                        comments: {
                            include: {
                                creator: true,
                                replies: {
                                    include: {
                                        creator: true
                                    }
                                },
                                event: {
                                    select: { id: true }
                                }
                            }
                        },
                        highlights: {
                            include: { user: true },
                        }
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
