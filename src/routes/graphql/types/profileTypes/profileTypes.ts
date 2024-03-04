import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberType } from '../memberTypes/memberTypes.js';
import { UUIDType } from '../uuid.js';
import { Context } from '../interfaces.js';
import { Profile } from '@prisma/client';
import { MemberTypeIdEnum } from '../memberTypes/memberTypeIdEnum.js';

const profileFields = {
  id: { type: new GraphQLNonNull(UUIDType) },
  isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
  yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
  userId: { type: new GraphQLNonNull(UUIDType) },
  memberType: {
    type: new GraphQLNonNull(MemberType),
    resolve: async ({ memberTypeId }: Profile, _args, { dataLoaders }: Context) => {
      return await dataLoaders.memberLoader.load(memberTypeId);
    },
  },
};

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => profileFields,
});
