import { GraphQLBoolean, GraphQLNonNull } from 'graphql';
import { PostType } from '../types/postTypes/postTypes.js';
import { UUIDType } from '../types/uuid.js';
import { CreatePost, ChangePost, ID } from '../types/interfaces.js';
import {
  CreatePostInputType,
  ChangePostInputType,
} from '../types/postTypes/postInput.js';

const createPostResolver = async (_, { dto }: CreatePost, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  prisma.post.create({ data: dto });

const changePostResolver = async (_, { id, dto }: ChangePost, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  prisma.post.update({ where: { id }, data: dto });

const deletePostResolver = async (_, { id }: ID, { prisma }) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  Boolean(await prisma.post.delete({ where: { id } }));

export const postMutationFields = {
  createPost: {
    type: PostType,
    args: { dto: { type: new GraphQLNonNull(CreatePostInputType) } },
    resolve: createPostResolver,
  },

  changePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: { type: new GraphQLNonNull(ChangePostInputType) },
    },
    resolve: changePostResolver,
  },

  deletePost: {
    type: GraphQLBoolean,
    args: { id: { type: new GraphQLNonNull(UUIDType) } },
    resolve: deletePostResolver,
  },
};
