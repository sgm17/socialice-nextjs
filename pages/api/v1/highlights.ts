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
                let { eventId, image } = req.body
                const userId = user.id

                let highlightedImage = await prisma.highlightModel.create({
                    data: {
                        eventId: eventId,
                        userId: userId,
                        image: image,
                    },
                    include: {
                        user: {
                            include: {
                                createdCommunity: {
                                    include: {
                                        owner: true,
                                        members: true,
                                        category: true
                                    }
                                },
                                communities: true,
                                interests: true,
                                organizer: {
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
                                },
                                events: {
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
                                }
                            }
                        }
                    }
                })
                res.status(200).json(highlightedImage)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the highlighted images of the event", error: e })
            }
            break
        case "DELETE":
            try {
                let { eventId, highlightId } = req.body

                await prisma.highlightModel.delete({
                    where: {
                        eventId: eventId,
                        id: highlightId,
                    },
                })
                res.status(200).json({ message: "ok" })
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the highlighted images of the event", error: e })
            }
            break
        default:
            break
    }
}
