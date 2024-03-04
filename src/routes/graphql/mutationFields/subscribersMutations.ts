import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UserSubscribedTo } from '../types/interfaces.js';
import { UserType } from '../types/userTypes/userTypes.js';

const subscribeToResolver = async (
  _,
  { userId, authorId }: UserSubscribedTo,
  { prisma },
) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  prisma.user.update({
    where: { id: userId },
    data: { userSubscribedTo: { create: { authorId } } },
  });

const unsubscribeFromResolver = async (
  _,
  { userId, authorId }: UserSubscribedTo,
  { prisma },
) =>
  Boolean(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    await prisma.subscribersOnAuthors.delete({
      where: {
        subscriberId_authorId: {
          subscriberId: userId,
          authorId,
        },
      },
    }),
  );

export const subscribeMutationFields = {
  subscribeTo: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: UserType,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: subscribeToResolver,
  },

  unsubscribeFrom: {
    type: GraphQLBoolean,
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: unsubscribeFromResolver,
  },
};
