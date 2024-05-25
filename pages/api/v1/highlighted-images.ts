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

                let highlightedImage = await prisma.highlightedImageModel.create({
                    data: {
                        eventId: eventId,
                        userId: userId,
                        image: image
                    }
                })
                res.status(200).json(highlightedImage)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the highlighted images of the event", error: e })
            }
            break
        default:
            break
    }
}
