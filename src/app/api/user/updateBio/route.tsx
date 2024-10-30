import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

interface UpdateBioRequest {
    bio: string;
}

export async function PUT(request: Request) {
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json() as UpdateBioRequest;
        const { bio } = body;

        if (!bio || typeof bio !== 'string') {
            return NextResponse.json({ error: 'Bio must be a string' }, { status: 400 });
        }

        const updatedUser = await prisma.user.update({
            where: { clerkId: userId },
            data: { bio },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Failed to update bio:", error);
        return NextResponse.json({ error: 'Failed to update bio' }, { status: 500 });
    }
}