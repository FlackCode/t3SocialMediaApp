import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

interface LikeRequestBody {
  postId: number;
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json() as LikeRequestBody;
    
    if (typeof body.postId !== 'number' || isNaN(body.postId)) {
      return NextResponse.json({ error: 'Invalid postId' }, { status: 400 });
    }

    const postId = body.postId;

    const existingLike = await prisma.like.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      return NextResponse.json({ liked: false });
    } else {
      await prisma.like.create({
        data: {
          postId: postId,
          userId: userId,
        },
      });
      return NextResponse.json({ liked: true });
    }
  } catch (error) {
    console.error('Error handling like:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}