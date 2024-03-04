import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';

export type Context = {
  dataLoaders: DataLoaders;
  prisma: PrismaClient;
};

export type ID = {
  id: string;
};

export type CreatePostDTO = {
  title: string;
  content: string;
  authorId: string;
};

export type ChangePostDTO = {
  title?: string;
  content?: string;
};

export type CreatePost = {
  dto: CreatePostDTO;
};

export type ChangePost = {
  id: string;
  dto: ChangePostDTO;
};

export type ProfileDTO = {
  isMale: boolean;
  yearOfBirth: number;
  memberTypeId: string;
  userId?: string;
};

export type CreateProfile = {
  dto: ProfileDTO & { userId: string };
};

export type ChangeProfile = {
  id: string;
  dto: Omit<ProfileDTO, 'userId'>;
};

export type UserDTO = {
  name: string;
  balance: number;
};

export type CreateUser = {
  dto: UserDTO;
};

export type ChangeUser = {
  id: string;
  dto: UserDTO;
};

export type UserSubscribedTo = {
  userId: string;
  authorId: string;
};

export interface UserSubs extends User {
  userSubscribedTo?: Subs[];
  subscribedToUser?: Subs[];
}
interface Subs {
  authorId: string;
  subscriberId: string;
}
export interface DataLoaders {
  postsLoader: DataLoader<string, Post[]>;
  profileLoader: DataLoader<string, Profile>;
  memberLoader: DataLoader<string, MemberType>;
  userLoader: DataLoader<string, User>;
}
