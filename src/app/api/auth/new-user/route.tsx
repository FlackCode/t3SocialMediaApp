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

  let dbUser = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        fullName: user.fullName ?? '',
        userName: user.username ?? '',
        email: user.emailAddresses[0]?.emailAddress ?? '',
        image: user.imageUrl ?? '',
        bio: '',
      },
    });
  }

  const redirectUrl = new URL('/', request.nextUrl.origin).toString();
  return NextResponse.redirect(redirectUrl);
}