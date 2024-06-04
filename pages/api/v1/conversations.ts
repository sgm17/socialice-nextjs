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
        case "GET":
            try {
                const userId = user.id

                let conversations = await prisma.conversationModel.findMany({
                    where: {
                        OR: [
                            {
                                userA: {
                                    id: userId
                                }
                            },
                            {
                                userB: {
                                    id: userId
                                }
                            }
                        ]
                    },
                    include: {
                        userA: {
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
                        userB: {
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
                res.status(200).json(conversations)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when retrieving the conversations", error: e })
            }
            break
        case "POST":
            try {
                let userAId = user.id
                let { userBId } = req.body

                let conversation = await prisma.conversationModel.create({
                    data: {
                        userAId: userAId,
                        userBId: userBId
                    },
                    include: {
                        userA: {
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
                        userB: {
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
                        messages: true
                    }
                })
                res.status(200).json(conversation)
            } catch (e) {
                console.log(e)
                res.status(500).json({ message: "Something has gone wrong when creating a conversation", error: e })
            }
            break
        default:
            break
    }
}