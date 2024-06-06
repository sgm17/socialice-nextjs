import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const user = await prisma.appUserModel.findUniqueOrThrow({
        where: {
            id: "1"
        },
        include: {
            events: true
        }
    })

    switch (req.method) {
        case "GET":
            try {
                let events = user.events

                let eventChats = await prisma.eventChatModel.findMany({
                    where: {
                        eventId: {
                            in: events.map(({ id }) => id)
                        }
                    },
                    include: {
                        messages: {
                            include: {
                                user: {
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

                                }
                            }
                        }
                    }
                })
                res.status(200).json(eventChats)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when retrieving the community chats", error: e })
            }
            break
        case "POST":
            try {
                const { eventId } = req.body

                let eventChat = await prisma.eventChatModel.create({
                    data: {
                        eventId
                    },
                    include: {
                        messages: {
                            include: {
                                user: {
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

                                }
                            }
                        }
                    }
                })
                res.status(200).json(eventChat)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when retrieving the community chats", error: e })

            }
        default:
            break
    }
}