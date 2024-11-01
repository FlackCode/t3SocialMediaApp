import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "~/lib/prisma";
import { type NextRequest } from "next/server";

async function handleErrors(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "An unexpected error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: NextRequest) {
  return handleErrors(async () => {
    const { userId } = getAuth(req);

    const whereClause = userId ? { createdById: { not: userId } } : {};

    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        createdBy: {
          select: {
            id: true,
            userName: true,
            image: true,
            fullName: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            createdBy: {
              select: {
                id: true,
                userName: true,
                image: true,
              }
            }
          },
          orderBy: { createdAt: 'desc' },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return new Response(JSON.stringify({ posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  });
}