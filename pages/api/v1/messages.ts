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
        case "POST":
            try {
                let userId = user.id
                let { receiverId, message, conversationId } = req.body

                let createdMessage = await prisma.messageModel.create({
                    data: {
                        senderId: userId,
                        receiverId: receiverId,
                        message: message,
                        conversationId: conversationId
                    },
                    include: {
                        receiver: {
                            include: {
                                createdCommunity: {
                                    include: {
                                        owner: true,
                                        members: true,
                                        category: true
                                    }
                                },
                                communities: {
                                    include: {
                                        owner: true,
                                        members: true,
                                        category: true
                                    }
                                },
                                interests: true,
                                organizer: {
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
                                },
                                events: {
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
                                }
                            }
                        },
                        sender: {
                            include: {
                                createdCommunity: {
                                    include: {
                                        owner: true,
                                        members: true,
                                        category: true
                                    }
                                },
                                communities: {
                                    include: {
                                        owner: true,
                                        members: true,
                                        category: true
                                    }
                                },
                                interests: true,
                                organizer: {
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
                                },
                                events: {
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
                                }
                            }
                        },
                    }
                })
                res.status(200).json(createdMessage)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when creating a conversation", error: e })
            }
            break
        default:
            break
    }
}