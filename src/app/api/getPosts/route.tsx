import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { type NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        let posts;
        const { userId } = getAuth(req);
        if (userId) {
            posts = await prisma.post.findMany({
                where: {
                    createdById: {
                        not: userId,
                    }
                },
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            userName: true,
                            image: true,
                            fullName: true,
                        },
                    },
                    comments: true,
                    likes: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        } else {
            posts = await prisma.post.findMany({
                include: {
                    createdBy: {
                        select: {
                            id: true,
                            userName: true,
                            image: true,
                            fullName: true,
                        },
                    },
                    comments: true,
                    likes: true,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
        }
        
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error fetching posts:", error);

        return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
