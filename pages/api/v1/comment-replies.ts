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
                let { commentId, commentReply } = req.body
                const userId = user.id

                let createdCommentReply = await prisma.commentReplyModel.create({
                    data: {
                        creatorId: userId,
                        commentId: commentId,
                        commentReply: commentReply,
                        likes: []
                    },
                    include: {
                        creator: true
                    }
                })
                res.status(200).json(createdCommentReply)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when creating the reply of the comment of the user", error: e })
            }
            break
        case "PUT":
            try {
                let { id } = req.body

                let oldCommentReply = await prisma.commentReplyModel.findUniqueOrThrow({
                    where: { id }
                })

                const userId = user.id
                const likes = oldCommentReply.likes.includes(userId)
                    ? oldCommentReply.likes.filter(like => like !== userId)
                    : [userId, ...oldCommentReply.likes];

                let updatedCommentReply = await prisma.commentReplyModel.update({
                    where: { id },
                    data: { likes },
                    include: {
                        creator: true
                    }
                })
                res.status(200).json(updatedCommentReply)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when creating the reply of the comment of the user", error: e })
            }
        default:
            break
    }
}
