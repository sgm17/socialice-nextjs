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
                res.status(200).json(events)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when retrieving the events", error: e })
            }
            break
        case "POST":
            try {
                const { name, description, image, placeName, completeAddress, communityId, startTimestamp, endTimestamp, latitude, longitude, price, priceWithoutDiscount, eventType } = req.body

                let event = await prisma.eventModel.create({
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
                    },
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
                        photos: [],
                        comments: { create: [] },
                        participants: { create: [] },
                        eventType: eventType,
                        popular: false,
                        highlightedImages: { create: [] },
                        startTimestamp: startTimestamp,
                        endTimestamp: endTimestamp,
                    }
                })
                res.status(200).json(event)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the event", error: e })
            }
            break
        case "PUT":
            try {
                const { id, name, description, image, placeName, completeAddress, startTimestamp, endTimestamp, latitude, longitude, price, priceWithoutDiscount, eventType } = req.body

                let event = await prisma.eventModel.update({
                    where: { id: id },
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
                    },
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
                        startTimestamp: startTimestamp,
                        endTimestamp: endTimestamp,
                        eventType: eventType
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
                res.status(200)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when deleting the event", error: e })
            }
            break
        default:
            break
    }
}
