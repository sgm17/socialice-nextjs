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
                let tickets = await prisma.ticketModel.findMany({
                    where: {
                        userId: user.id
                    },
                    include: {
                        event: {
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
                res.status(200).json(tickets)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when retrieving the tickets", error: e })
            }
            break
        case "POST":
            try {
                const { eventId, qrCode } = req.body

                let ticket = await prisma.ticketModel.create({
                    data: {
                        user: { connect: { id: user.id } },
                        event: { connect: { id: eventId } },
                        qrCode: qrCode,
                    }
                })
                res.status(200).json(ticket)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when retrieving the tickets", error: e })
            }
            break
        default:
            break
    }
}
