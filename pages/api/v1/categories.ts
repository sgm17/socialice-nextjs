import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case "GET":
            try {
                let categories = await prisma.categoryModel.findMany({})
                res.status(200).json(categories)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when retrieving the categories", error: e })
            }
            break
        default:
            break
    }
}
