import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLFloat,
} from 'graphql';
import { ProfileType } from '../profileTypes/profileTypes.js';
import { UUIDType } from '../uuid.js';
import { PostType } from '../postTypes/postTypes.js';
import { Context, UserSubs } from '../interfaces.js';
import { User } from '@prisma/client';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: function () {
    return {
      id: { type: new GraphQLNonNull(UUIDType) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      balance: { type: new GraphQLNonNull(GraphQLFloat) },
      profile: {
        type: ProfileType,
        resolve: function ({ id }: User, _args, { dataLoaders }: Context) {
          return dataLoaders.profileLoader.load(id);
        },
      },
      posts: {
        type: new GraphQLList(PostType),
        resolve: function ({ id }: User, _args, { dataLoaders }: Context) {
          return dataLoaders.postsLoader.load(id);
        },
      },
      userSubscribedTo: {
        type: new GraphQLList(UserType),
        resolve: function (
          { userSubscribedTo }: UserSubs,
          _args,
          { dataLoaders }: Context,
        ) {
          if (!userSubscribedTo) return null;
          const authorIds = userSubscribedTo.map(({ authorId }) => authorId);
          return dataLoaders.userLoader.loadMany(authorIds);
        },
      },
      subscribedToUser: {
        type: new GraphQLList(UserType),
        resolve: function (
          { subscribedToUser }: UserSubs,
          _args,
          { dataLoaders }: Context,
        ) {
          if (!subscribedToUser) return null;
          const subscriberIds = subscribedToUser.map(({ subscriberId }) => subscriberId);
          return dataLoaders.userLoader.loadMany(subscriberIds);
        },
      },
    };
  },
});
