import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} from 'graphql';

import { UUIDType } from '../uuid.js';
import { ProfileType } from '../profileTypes/profileTypes.js';
import { PostType } from '../postTypes/postTypes.js';
import { ID, Context } from '../interfaces.js';

export const UserType = new GraphQLObjectType({
  name: 'User',

  fields: function () {
    return {
      id: { type: new GraphQLNonNull(UUIDType) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      balance: { type: new GraphQLNonNull(GraphQLFloat) },

      profile: {
        type: ProfileType,
        resolve: function (source: ID, args, context: Context) {
          return context.prisma.profile.findUnique({ where: { userId: source.id } });
        },
      },

      posts: {
        type: new GraphQLList(PostType),
        resolve: function (source: ID, args, context: Context) {
          return context.prisma.post.findMany({ where: { authorId: source.id } });
        },
      },

      userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: function (source: ID, args, context: Context) {
          return context.prisma.user.findMany({
            where: { subscribedToUser: { some: { subscriberId: source.id } } },
          });
        },
      },

      subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: function (source: ID, _args, context: Context) {
          return context.prisma.user.findMany({
            where: { userSubscribedTo: { some: { authorId: source.id } } },
          });
        },
      },
    };
  },
});
