import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function POST(
    request: Request,
    { params }: { params: { username: string } }
) {
    try {
        const { userId: clerkId } = await auth();
        if (!clerkId) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const targetUser = await prisma.user.findFirst({
            where: { userName: params.username },
            select: { clerkId: true }
        });

        if (!targetUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const existingFollow = await prisma.follow.findFirst({
            where: {
                followedByUserId: clerkId,
                followingUserId: targetUser.clerkId
            }
        });

        if (existingFollow) {
            await prisma.follow.delete({
                where: { id: existingFollow.id }
            });
        } else {
            await prisma.follow.create({
                data: {
                    followedByUserId: clerkId,
                    followingUserId: targetUser.clerkId
                }
            });
        }

        const followersCount = await prisma.follow.count({
            where: { followingUserId: targetUser.clerkId }
        });

        const followingCount = await prisma.follow.count({
            where: { followedByUserId: clerkId }
        });

        return NextResponse.json({
            followed: !existingFollow,
            followersCount,
            followingCount,
        });
    } catch (error) {
        console.error('Error toggling follow:', error);
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
