import { auth, currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new NextResponse('User does not exist', { status: 404 });
  }

  const searchParams = request.nextUrl.searchParams;
  const fullName = searchParams.get('fullName');
  const username = searchParams.get('username');
  const bio = searchParams.get('bio');

  if (!fullName || !username) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  try {
    let dbUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          clerkId: user.id,
          fullName: fullName,
          userName: username,
          email: user.emailAddresses[0]?.emailAddress ?? '',
          image: user.imageUrl ?? '',
          bio: bio ?? '',
        },
      });
    } else {
      dbUser = await prisma.user.update({
        where: { clerkId: user.id },
        data: {
          fullName: fullName,
          userName: username,
          bio: bio ?? '',
        },
      });
    }

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Database error:', error);
    return new NextResponse('Database error', { status: 500 });
  }
}