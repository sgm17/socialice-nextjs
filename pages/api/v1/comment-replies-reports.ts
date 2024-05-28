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
                let { commentReplyId } = req.body
                const userId = user.id

                let commentReply = await prisma.commentReplyModel.findUniqueOrThrow({
                    where: { id: commentReplyId },
                })

                let updatedCommentReply = await prisma.commentReplyModel.update({
                    where: { id: commentReplyId },
                    data: { reports: [userId, ...commentReply.reports] },
                    include: {
                        creator: true
                    }
                })
                res.status(200).json(updatedCommentReply)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the likes of the event", error: e })
            }
            break
        default:
            break
    }
}
