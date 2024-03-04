import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../types/profileTypes/profileTypes.js';
import { CreateProfile, ChangeProfile, ID } from '../types/interfaces.js';
import {
  CreateProfileInputType,
  ChangeProfileInputType,
} from '../types/profileTypes/profileInput.js';

const createProfileResolver = async (_, { dto }: CreateProfile, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  prisma.profile.create({ data: dto });

const changeProfileResolver = async (_, { id, dto }: ChangeProfile, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  prisma.profile.update({ where: { id }, data: dto });

const deleteProfileResolver = async (_, { id }: ID, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  Boolean(await prisma.profile.delete({ where: { id } }));

export const profileMutationFields = {
  createProfile: {
    type: ProfileType,
    args: { dto: { type: new GraphQLNonNull(CreateProfileInputType) } },
    resolve: createProfileResolver,
  },

  changeProfile: {
    type: ProfileType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangeProfileInputType) },
    },
    resolve: changeProfileResolver,
  },

  deleteProfile: {
    type: GraphQLBoolean,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: deleteProfileResolver,
  },
};
