import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const user = await prisma.appUserModel.findUniqueOrThrow({
        where: {
            id: "1"
        }
    })

    switch (req.method) {
        case "PUT":
            try {
                let { eventId } = req.body
                const userId = user.id

                let event = await prisma.eventModel.findFirstOrThrow({
                    where: { id: eventId }
                })

                let updatedEventModel = await prisma.eventModel.update({
                    where: { id: eventId },
                    data: {
                        reports: {
                            set: [userId, ...event.reports]
                        }
                    },
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
                res.status(200).json(updatedEventModel)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the favourites of the user", error: e })
            }
            break
        default:
            break
    }
}