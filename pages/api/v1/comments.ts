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
                let { eventId, comment } = req.body
                const userId = user.id

                let createdComment = await prisma.commentModel.create({
                    data: {
                        creatorId: userId,
                        eventId: eventId,
                        comment: comment,
                        replies: { create: [] },
                        likes: []
                    }
                })
                res.status(200).json(createdComment)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when creating the comment of the user", error: e })
            }
            break
        case "PUT":
            try {
                let { id } = req.body

                let oldComment = await prisma.commentModel.findUniqueOrThrow({
                    where: { id: id }
                })

                const userId = user.id
                const likes = oldComment.likes.includes(userId)
                    ? oldComment.likes.filter(like => like !== userId)
                    : [userId, ...oldComment.likes];

                let updatedComment = await prisma.commentModel.update({
                    where: { id: id },
                    data: {
                        likes: likes
                    }
                })
                res.status(200).json(updatedComment)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the likes of the event", error: e })
            }
            break
        default:
            break
    }
}
