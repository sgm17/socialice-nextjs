import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const user = await prisma.appUserModel.findUniqueOrThrow({
        where: {
            id: "1"
        },
        include: {
            communities: true
        }
    })

    switch (req.method) {
        case "PUT":
            try {
                let { communityId } = req.body
                const userId = user.id

                const community = await prisma.communityModel.findUniqueOrThrow({
                    where: { id: communityId },
                    include: { members: true },
                });

                const isMember = community.members.some(member => member.id === userId);
                let updateData;

                if (isMember) {
                    // Remove the user from members
                    updateData = {
                        members: {
                            disconnect: { id: userId },
                        },
                    };
                } else {
                    // Add the user to members
                    updateData = {
                        members: {
                            connect: { id: userId },
                        },
                    };
                }
                const updatedCommunity = await prisma.communityModel.update({
                    where: { id: communityId },
                    data: updateData,
                    include: {
                        owner: true,
                        members: true,
                        category: true
                    }
                });

                res.status(200).json(updatedCommunity);
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the community", error: e })
            }
        default:
            break
    }
}
