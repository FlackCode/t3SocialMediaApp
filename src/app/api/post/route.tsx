import { PrismaClient } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

interface PostRequestBody {
    content: string;
    createdById: string;
}

export async function POST(request: NextRequest) {
    try {
        const { content, createdById } = await request.json() as PostRequestBody;

        if (!content || !createdById) {
            return NextResponse.json({ error: 'Missing content or createdById' }, { status: 400 });
        }

        const userExists = await prisma.user.findUnique({
            where: { clerkId: createdById },
        });

        if (!userExists) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const post = await prisma.post.create({
            data: {
                content,
                createdById,
            },
        });

        return NextResponse.json(post, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);

        if (error) {
            return NextResponse.json({ error: `Prisma error` }, { status: 500 });
        }

        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}
