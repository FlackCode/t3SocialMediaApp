import { prisma } from '~/lib/prisma';
import { type PostWithPartialRelations } from '~/types';
import { notFound } from 'next/navigation';

export async function getPost(id: string): Promise<PostWithPartialRelations> {
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
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
      comments: {
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
        orderBy: {
          createdAt: 'desc',
        },
      },
      likes: true,
      shares: true,
    },
  });

  if (!post) notFound();
  return post as PostWithPartialRelations;
}