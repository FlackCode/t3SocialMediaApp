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
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            select: {
                bio: true,
                id: true,
                clerkId: true,
                fullName: true,
                userName: true,
                email: true,
                image: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Failed to fetch user data:", error);
        return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
}