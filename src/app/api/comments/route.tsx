import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { type CommentRequest } from '~/types';

export async function POST(req: Request) {
    try {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      const body = await req.json() as CommentRequest;
      const { postId, content } = body;
  
      const user = await prisma.user.findUnique({
        where: { clerkId: userId },
      });
  
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      const comment = await prisma.comment.create({
        data: {
          content,
          postId,
          createdById: user.id,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              clerkId: true,
              userName: true,
              fullName: true,
              email: true,
              image: true,
              bio: true,
            }
          },
        },
      });
  
      return NextResponse.json(comment);
    } catch (error) {
      console.error('Error creating comment:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  }