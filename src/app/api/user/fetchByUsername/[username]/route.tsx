import { prisma } from "~/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  const username = params.username;

  if (!username || username === 'undefined') {
    return NextResponse.json({ error: "Invalid username" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findFirst({
      where: { userName: username },
      select: {
        id: true,
        userName: true,
        fullName: true,
        image: true,
        bio: true,
        posts: {
          include: {
            likes: true,
            comments: true,
            shares: true,
            createdBy: {
              select: {
                userName: true,
                fullName: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: {
          include: {
            post: {
              include: {
                likes: true,
                comments: true,
                shares: true,
                createdBy: {
                  select: {
                    userName: true,
                    fullName: true,
                    image: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Transform the likes array to get the posts
    const likedPosts = user.likes.map(like => like.post);

    return NextResponse.json({
      ...user,
      likedPosts,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}