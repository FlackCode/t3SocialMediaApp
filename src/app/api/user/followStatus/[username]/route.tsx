import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { username: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const targetUser = await prisma.user.findFirst({
            where: { 
                userName: params.username 
            },
            select: {
                id: true,
                _count: {
                    select: {
                        followers: true,
                        following: true
                    }
                }
            }
        });

        if (!targetUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: userId,
                followingId: targetUser.id
            }
        });

        return NextResponse.json({
            isFollowing: !!existingFollow,
            followersCount: targetUser._count.followers,
            followingCount: targetUser._count.following
        });
    } catch (error) {
        console.error('Error fetching follow status:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}