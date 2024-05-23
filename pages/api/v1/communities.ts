import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        return res.status(200).json(await prisma.communityModel.findMany({
            include: {
                owner: true,
                members: true,
            }
        }))

    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
