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
                const favourites = user.favourites.includes(eventId)
                    ? user.favourites.filter(favourite => favourite !== userId)
                    : [userId, ...user.favourites];

                let updatedAppUserModel = await prisma.appUserModel.update({
                    where: { id: userId },
                    data: {
                        favourites: {
                            set: favourites
                        }
                    },
                    include: { communities: true }
                })
                res.status(200).json(updatedAppUserModel)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the favourites of the user", error: e })
            }
            break
        default:
            break
    }
}
