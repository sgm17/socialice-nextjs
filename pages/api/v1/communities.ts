import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const user = await prisma.appUserModel.findUnique({
        where: {
            id: "1"
        }
    })

    switch (req.method) {
        case "GET":
            try {
                let communities = await prisma.communityModel.findMany({
                    include: {
                        owner: true,
                        members: true,
                        category: true
                    }
                })
                res.status(200).json(communities)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the event", error: e })
            }
            break;
        case "POST":
            try {
                const { image, name, city, description, categoryId } = req.body

                let community = await prisma.communityModel.create({
                    data: {
                        ownerId: user!.id,
                        image: image,
                        name: name,
                        members: { create: [] },
                        city: city,
                        description: description,
                        events: { create: [] },
                        categoryId: categoryId
                    },
                    include: {
                        owner: true,
                        members: true,
                        category: true
                    }
                })
                res.status(200).json(community)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the event", error: e })
            }
        case "PUT":
            try {
                const { id, image, name, city, description, categoryId } = req.body

                let community = await prisma.communityModel.update({
                    where: { id: id },
                    data: {
                        name: name,
                        description: description,
                        city: city,
                        categoryId: categoryId,
                        image: image,
                    },
                    include: {
                        owner: true,
                        members: true,
                        category: true
                    }
                })
                res.status(200).json(community)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the event", error: e })
            }
        case "DELETE":
            try {
                const { id } = req.body

                let community = await prisma.communityModel.delete({
                    where: { id: id },
                    include: {
                        owner: true,
                        members: true,
                        category: true
                    }
                })
                res.status(200).json(community)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when deleting the event", error: e })
            }
        default:
            break;
    }
}
