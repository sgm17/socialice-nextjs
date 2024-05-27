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
            const { id } = req.query

            if (typeof id === "string") {
                try {
                    let appUser = await prisma.appUserModel.findUnique({
                        where: {
                            id: id
                        },
                        include: {
                            communities: true,
                            interests: true
                        }
                    })
                    res.status(200).json(appUser)
                } catch (e) {
                    res.status(500).json({ message: "Something has gone wrong when retrieving the user", error: e })
                }
            } else if (!id) {
                try {
                    let appUser = await prisma.appUserModel.findUnique({
                        where: {
                            id: user!.id
                        },
                        include: {
                            communities: true,
                            interests: true
                        }
                    })
                    res.status(200).json(appUser)
                } catch (e) {
                    res.status(500).json({ message: "Something has gone wrong when retrieving the user", error: e })
                }
            }
            break
        case "POST":
            try {

                const { uid, name, surname, username, email, location, latitude, longitude } = req.body
                let appUser = await prisma.appUserModel.create({
                    data: {
                        uid: uid,
                        name: name,
                        surname: surname,
                        username: username,
                        email: email,
                        location: location,
                        latitude: latitude,
                        longitude: longitude
                    },
                    include: {
                        communities: true,
                        interests: true
                    }
                })
                res.status(200).json(appUser)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when creating the user", error: e })
            }
            break

        case "PUT":
            try {
                const { name, surname, username, description, profileImage, location, latitude, longitude } = req.body

                const updatedUser = await prisma.appUserModel.update({
                    where: { id: user!.id },
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
                        communities: true,
                        interests: true
                    }
                })
                res.status(200).json(updatedUser)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the user", error: e })
            }
            break

        case "DELETE":
            try {
                await prisma.appUserModel.delete({
                    where: { id: user!.id },
                    include: {
                        communities: true,
                        interests: true
                    }
                })
                res.status(200)
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the user", error: e })
            }
            break
        default:
            break

    }

}
