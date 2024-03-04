import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { UUIDType } from '../uuid.js';

const createPostFields = () => ({
  title: {
    type: new GraphQLNonNull(GraphQLString),
  },
  content: {
    type: new GraphQLNonNull(GraphQLString),
  },
  authorId: {
    type: new GraphQLNonNull(UUIDType),
  },
});

export const CreatePostInputType = new GraphQLInputObjectType({
  name: 'CreatePostInput',
  fields: createPostFields,
});

const changePostFields = () => ({
  title: {
    type: GraphQLString,
  },
  content: {
    type: GraphQLString,
  },
});

export const ChangePostInputType = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: changePostFields,
});
