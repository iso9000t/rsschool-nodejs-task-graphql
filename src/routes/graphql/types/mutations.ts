import { GraphQLObjectType } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { postMutationFields } from '../mutationFields/postMutations.js';
import { profileMutationFields } from '../mutationFields/profileMutations.js';
import { userMutationFields } from '../mutationFields/userMutations.js';
import { subscribeMutationFields } from '../mutationFields/subscribersMutations.js';

const organizeMutationFields = () => ({
  ...postMutationFields,

  ...profileMutationFields,

  ...userMutationFields,

  ...subscribeMutationFields,
});

export const MutationType = new GraphQLObjectType<string, { prisma: PrismaClient }>({
  name: 'Mutation',

  fields: organizeMutationFields,
});
