import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        return res.status(200).json(await prisma.eventModel.findMany({
            include: {
                organizers: true,
                community: {
                    include: {
                        owner: true
                    }
                },
                comments: true,
                participants: true,
                highlightedImages: true
            }
        }))

    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
