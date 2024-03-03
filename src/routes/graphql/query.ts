import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from './types/uuid.js';
import { Context, ID } from './types/interfaces.js';
import { MemberTypeIdEnum } from './types/memberTypes/memberTypeIdEnum.js';
import { MemberType } from './types/memberTypes/memberTypes.js';
import { PostType } from './types/postTypes/postTypes.js';
import { ProfileType } from './types/profileTypes/profileTypes.js';
import { UserType } from './types/userTypes/userTypes.js';

export const QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      memberTypes: {
        type: new GraphQLList(MemberType),
        resolve: async function (_source, _args, { prisma }: Context) {
          return prisma.memberType.findMany();
        },
      },
      memberType: {
        type: MemberType,
        args: { id: { type: new GraphQLNonNull(MemberTypeIdEnum) } },
        resolve: async function (_source, args: ID, { prisma }: Context) {
          return prisma.memberType.findUnique({ where: { id: args.id } });
        },
      },
      posts: {
        type: new GraphQLList(PostType),
        args: {},
        resolve: async function (_source, _args, { prisma }: Context) {
          return prisma.post.findMany();
        },
      },
      post: {
        type: PostType,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async function (_source, args: ID, { prisma }: Context) {
          return prisma.post.findUnique({ where: { id: args.id } });
        },
      },
      profiles: {
        type: new GraphQLList(ProfileType),
        resolve: async function (_source, _args, { prisma }: Context) {
          return prisma.profile.findMany();
        },
      },
      profile: {
        type: ProfileType,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async function (_source, args: ID, { prisma }: Context) {
          return prisma.profile.findUnique({ where: { id: args.id } });
        },
      },
      users: {
        type: new GraphQLList(UserType),
        resolve: async function (_source, _args, { prisma }: Context) {
          return prisma.user.findMany();
        },
      },
      user: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        type: UserType,
        args: { id: { type: new GraphQLNonNull(UUIDType) } },
        resolve: async function (_source, args: ID, { prisma }: Context) {
          return prisma.user.findUnique({ where: { id: args.id } });
        },
      },
    };
  },
});
