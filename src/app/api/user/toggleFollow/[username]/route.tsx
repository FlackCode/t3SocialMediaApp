import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

interface UserCounts {
    followers: Array<{ clerkId: string; userName: string; fullName?: string; image?: string }>;
    following: Array<{ clerkId: string; userName: string; fullName?: string; image?: string }>;
}

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
            select: { clerkId: true } // selecting clerkId as per the schema
        });

        if (!targetUser) {
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
            );
        }

        const existingFollow = await prisma.follow.findFirst({
            where: {
                followerId: clerkId, // current user
                followingId: targetUser.clerkId // target user
            }
        });
        
        // Toggle follow status
        if (existingFollow) {
            await prisma.follow.delete({
                where: { id: existingFollow.id }
            });
        } else {
            await prisma.follow.create({
                data: {
                    followerId: clerkId,
                    followingId: targetUser.clerkId
                }
            });
        }
        
        // Get updated follower and following counts
        const followersCount = await prisma.follow.count({
            where: {
                followingId: targetUser.clerkId
            }
        });
        
        const followingCount = await prisma.follow.count({
            where: {
                followerId: targetUser.clerkId
            }
        });
        
        // Return the counts
        return NextResponse.json({
            followed: !existingFollow,
            followersCount,
            followingCount,
        });
    } catch (error) {
        console.error(
            'Error toggling follow:',
            error instanceof Error ? error.message : error
        );
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        );
    }
}
