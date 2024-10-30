import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const posts = await prisma.post.findMany({
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
