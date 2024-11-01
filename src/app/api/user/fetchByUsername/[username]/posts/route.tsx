import { prisma } from "~/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  try {
    const posts = await prisma.post.findMany({
      where: { createdBy: { userName: username } },
      include: {
        createdBy: {
          select: {
            id: true,
            userName: true,
            fullName: true,
            image: true,
          },
        },
        comments: {
          include: {
            createdBy: {
              select: {
                id: true,
                userName: true,
                image: true,
              },
            },
          },
        },
        likes: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}