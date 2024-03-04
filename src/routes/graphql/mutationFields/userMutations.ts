import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { UserType } from '../types/userTypes/userTypes.js';
import { CreateUserInputType, ChangeUserInputType } from '../types/userTypes/userInput.js';
import { CreateUser, ChangeUser, ID } from '../types/interfaces.js';

const createUserResolver = async (_, { dto }: CreateUser, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  prisma.user.create({ data: dto });

const changeUserResolver = async (_, { id, dto }: ChangeUser, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  prisma.user.update({ where: { id }, data: dto });

const deleteUserResolver = async (_, { id }: ID, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  Boolean(await prisma.user.delete({ where: { id } }));

export const userMutationFields = {
  createUser: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: UserType,
    args: { dto: { type: new GraphQLNonNull(CreateUserInputType) } },
    resolve: createUserResolver,
  },

  changeUser: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeUserInputType) },
    },
    resolve: changeUserResolver,
  },

  deleteUser: {
    type: GraphQLBoolean,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: deleteUserResolver,
  },
};
