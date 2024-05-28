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
                let { commentId } = req.body
                const userId = user.id

                let comment = await prisma.commentModel.findFirstOrThrow({
                    where: { id: commentId }
                })

                let updatedComment = await prisma.commentModel.update({
                    where: { id: commentId },
                    data: {
                        reports: {
                            set: [userId, ...comment.reports]
                        }
                    },
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
                })
                res.status(200).json(updatedComment)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the comment of the user", error: e })
            }
            break
        default:
            break
    }
}
