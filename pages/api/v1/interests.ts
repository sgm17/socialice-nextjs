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
        case "GET":
            try {
                let interests = await prisma.interestModel.findMany({})
                res.status(200).json(interests)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when retrieving the interests of the user", error: e })
            }
            break
        case "PUT":
            try {
                let { interests } = req.body
                const userId = user.id

                let interestIds = interests.map((e: any) => ({ id: e.id }))

                let updatedAppUserModel = await prisma.appUserModel.update({
                    where: { id: userId },
                    data: {
                        interests: { set: interestIds }
                    },
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
                })
                res.status(200).json(updatedAppUserModel)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when updating the interests of the user", error: e })
            }
        default:
            break
    }
}
