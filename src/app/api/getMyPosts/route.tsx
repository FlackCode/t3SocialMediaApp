import { getAuth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { type NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req);

        const posts = await prisma.post.findMany({
            where: {
                createdById: userId!,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        userName: true,
                        fullName: true,
                        image: true,
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
        console.error("Error fetching my posts:", error);

        return new Response(JSON.stringify({ error: "Failed to fetch my posts" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
