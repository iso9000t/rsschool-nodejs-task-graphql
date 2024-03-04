import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';
import { DataLoaders } from '../types/interfaces.js';
import { batchMember } from './batching/batchMember.js';
import { batchPosts } from './batching/batchPosts.js';
import { batchProfile } from './batching/batchProfile.js';
import { batchUser } from './batching/batchUser.js';

export const createDataLoaders = (prisma: PrismaClient): DataLoaders => ({
  profileLoader: new DataLoader(batchProfile(prisma)),
  postsLoader: new DataLoader(batchPosts(prisma)),
  memberLoader: new DataLoader(batchMember(prisma)),
  userLoader: new DataLoader(batchUser(prisma)),
});
