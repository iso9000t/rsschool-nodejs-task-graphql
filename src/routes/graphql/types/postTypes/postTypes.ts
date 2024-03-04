import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { UUIDType } from '../uuid.js';
import { Context } from '../interfaces.js';
import { UserType } from '../userTypes/userTypes.js';
import { Post } from '@prisma/client';

function isGraphQLObjectType(type: unknown): type is GraphQLObjectType {
  return type instanceof GraphQLObjectType;
}

const postFields = function () {
  if (!isGraphQLObjectType(UserType)) {
    throw new Error('UserType is not a GraphQLObjectType');
  }

  return {
    id: { type: new GraphQLNonNull(UUIDType) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
    author: {
      type: UserType, // No need for 'as' due to the runtime check above
      resolve: async ({ authorId }: Post, _args, { dataLoaders }: Context) => {
        return dataLoaders.userLoader.load(authorId);
      },
    },
  };
};

export const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: postFields,
});
