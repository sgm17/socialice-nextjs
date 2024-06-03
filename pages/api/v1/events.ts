import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            try {
                let events = await prisma.eventModel.findMany({
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
                res.status(200).json(events)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when retrieving the events", error: e })
            }
            break
        case "POST":
            try {
                const { name, description, image, placeName, completeAddress, communityId, startDate, endDate, latitude, longitude, price, priceWithoutDiscount, eventType } = req.body

                let event = await prisma.eventModel.create({
                    data: {
                        name: name,
                        description: description,
                        image: image,
                        placeName: placeName,
                        completeAddress: completeAddress,
                        communityId: communityId,
                        price: price,
                        priceWithoutDiscount: priceWithoutDiscount,
                        organizers: { create: [] },
                        latitude: latitude,
                        longitude: longitude,
                        comments: { create: [] },
                        participants: { create: [] },
                        eventType: eventType,
                        popular: false,
                        highlights: { create: [] },
                        startDate: new Date(startDate).toISOString(),
                        endDate: new Date(endDate).toISOString(),
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
                res.status(200).json(event)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when updating the event", error: e })
            }
            break
        case "PUT":
            try {
                const { id, name, description, image, placeName, completeAddress, startDate, endDate, latitude, longitude, price, priceWithoutDiscount, eventType } = req.body

                let event = await prisma.eventModel.update({
                    where: { id: id },
                    data: {
                        name: name,
                        description: description,
                        image: image,
                        placeName: placeName,
                        completeAddress: completeAddress,
                        price: price,
                        priceWithoutDiscount: priceWithoutDiscount,
                        latitude: latitude,
                        longitude: longitude,
                        startDate: startDate,
                        endDate: endDate,
                        eventType: eventType
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
                res.status(200).json(event)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the event", error: e })
            }
            break
        case "DELETE":
            const { id } = req.body
            try {
                await prisma.eventModel.delete({
                    where: { id }
                })
                res.status(200).json({ message: "ok" })
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when deleting the event", error: e })
            }
            break
        default:
            break
    }
}
