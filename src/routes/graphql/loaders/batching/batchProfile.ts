import { Profile, PrismaClient } from '@prisma/client';

export const batchProfile =
  (prisma: PrismaClient) => async (userIds: readonly string[]) => {
    const mutableUserIds = [...userIds];

    const profiles = await prisma.profile.findMany({
      where: { userId: { in: mutableUserIds } },
    });

    const profileMap: Record<string, Profile> = {};
    for (const profile of profiles) {
      profileMap[profile.userId] = profile;
    }

    return userIds.map((id) => profileMap[id]);
  };
