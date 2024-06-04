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
        case "GET":
            try {
                let communities = user.communities

                let communityChats = await prisma.communityChatModel.findMany({
                    where: {
                        communityId: {
                            in: communities.map(({ id }) => id)
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
                res.status(200).json(communityChats)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when retrieving the community chats", error: e })
            }
            break
        case "POST":
            try {
                const { communityId } = req.body

                let communityChat = await prisma.communityChatModel.create({
                    data: {
                        communityId
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
                res.status(200).json(communityChat)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when retrieving the community chats", error: e })

            }
        default:
            break
    }
}