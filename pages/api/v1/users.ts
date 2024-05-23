import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === "PUT") {
        try {
            const { name, surname, username, description, profileImage, location, latitude, longitude } = req.body;

            const updatedUser = await prisma.appUserModel.update({
                where: { id: "1" },
                data: {
                    name: name,
                    surname: surname,
                    username: username,
                    description: description,
                    profileImage: profileImage,
                    location: location,
                    latitude: latitude,
                    longitude: longitude
                },
                include: {
                    communities: true
                }
            });
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to update the user' });

        }
    }

    try {
        if (!id) {
            return res.status(200).json(await prisma.appUserModel.findUnique({
                where: {
                    id: "1"
                },
                include: {
                    communities: true,
                }
            }))
        }

        // ensure the `id` parameter is provided and is a string
        if (typeof id !== 'string') {
            return res.status(400).json({ error: 'Invalid or missing id parameter' });
        }

        // fetch the user with the specified ID
        const myUser = await prisma.appUserModel.findUnique({
            where: {
                id: id,
            },
        });

        // If the user is not found, return a 404 response
        if (!myUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return the user data in the response
        res.status(200).json(myUser);
    } catch (error) {
        // Handle any errors that occur during the database query
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
