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
                const userId = user.id
                const { cloudToken } = req.body

                await prisma.cloudTokenModel.update({
                    where: { userId: userId },
                    data: { cloudToken },
                })
                res.status(200).json({ message: "ok" })
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when creating the reply of the comment of the user", error: e })
            }
            break
        default:
            break
    }
}
