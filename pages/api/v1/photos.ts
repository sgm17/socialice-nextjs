import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "PUT":
            try {
                let { eventId, photo } = req.body

                let event = await prisma.eventModel.findUniqueOrThrow({
                    where: { id: eventId },
                })

                let updatedEvent = await prisma.eventModel.update({
                    where: { id: eventId },
                    data: {
                        photos: [photo, ...event.photos]
                    },
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
                res.status(500).json({ message: "Something has gone wrong when updating the photos of the event", error: e })
            }
            break
        default:
            break
    }
}
