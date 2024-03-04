import { PrismaClient } from '@prisma/client';
import { UserSubs } from '../../types/interfaces.js';

export const batchUser =
  (prisma: PrismaClient) =>
  async (ids: readonly string[]): Promise<UserSubs[]> => {
    const mutableIds = [...ids];

    const users = (await prisma.user.findMany({
      where: { id: { in: mutableIds } },
      include: { userSubscribedTo: true, subscribedToUser: true },
    })) as UserSubs[];

    const userLookup: Record<string, UserSubs> = users.reduce((acc, user) => {
      acc[user.id] = user;
      return acc;
    }, {});

    return ids.map((id) => userLookup[id]);
  };
