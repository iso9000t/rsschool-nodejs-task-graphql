import { Post, PrismaClient } from '@prisma/client';

export const batchPosts =
  (prisma: PrismaClient) => async (userIds: readonly string[]) => {
    const mutableUserIds = [...userIds];
    const posts = await prisma.post.findMany({
      where: { authorId: { in: mutableUserIds } },
    });

    const result: Record<string, Post[]> = {};
    for (const post of posts) {
      if (!result[post.authorId]) {
        result[post.authorId] = [];
      }
      result[post.authorId].push(post);
    }

    return userIds.map((id) => result[id] || []);
  };
