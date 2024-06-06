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
        case "POST":
            try {
                const { chatId, message } = req.body
                const userId = user.id

                let communityMessage = await prisma.eventMessageModel.create({
                    data: {
                        userId: userId,
                        chatId: chatId,
                        message: message
                    }
                })
                res.status(200).json(communityMessage)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when creating a community message", error: e })
            }
        default:
            break
    }
}