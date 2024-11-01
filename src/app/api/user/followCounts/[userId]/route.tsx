import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId } = params;

    if (!userId) {
        return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    try {
        const [followersCount, followingCount] = await Promise.all([
            prisma.follow.count({ where: { followingUserId: userId } }),
            prisma.follow.count({ where: { followedByUserId: userId } }),
        ]);

        return NextResponse.json({ followersCount, followingCount });
    } catch (error) {
        console.error("Failed to fetch follow counts:", error);
        return NextResponse.json({ error: 'Failed to fetch follow counts' }, { status: 500 });
    }
}
