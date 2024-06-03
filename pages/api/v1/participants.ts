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
                const { eventId } = req.body
                const userId = user.id

                const event = await prisma.eventModel.findUniqueOrThrow({
                    where: { id: eventId },
                    include: { participants: true },
                });

                // Determine whether to add or remove the user
                const isParticipant = event.participants.some(participant => participant.id === userId);
                let updateData;

                if (isParticipant) {
                    // Remove the user from members
                    updateData = {
                        participants: {
                            disconnect: { id: userId },
                        },
                    };
                } else {
                    // Add the user to participants
                    updateData = {
                        participants: {
                            connect: { id: userId },
                        },
                    };
                }

                // Perform the update
                const updatedEvent = await prisma.eventModel.update({
                    where: { id: eventId },
                    data: updateData,
                    include: {
                        organizers: true,
                        participants: true,
                        community: {
                            include: {
                                owner: true,
                                members: true,
                                category: true,
                            }
                        },
                        comments: {
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
                        },
                        highlights: {
                            include: { user: true },
                        }
                    }
                });
                res.status(200).json(updatedEvent);
            } catch (e) {
                res.status(500).json({ message: "Something has gone wrong when updating the participants of the event", error: e })
            }
            break
        default:
            break
    }
}
