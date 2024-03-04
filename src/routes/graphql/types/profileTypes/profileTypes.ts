import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../uuid.js';
import { MemberType } from '../memberTypes/memberTypes.js';
import { Context } from '../interfaces.js';

const profileFields = {
  id: { type: new GraphQLNonNull(UUIDType) },
  isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
  yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
  userId: { type: new GraphQLNonNull(UUIDType) },
  memberType: {
    type: new GraphQLNonNull(MemberType),
    resolve: async (source: { memberTypeId: string }, _args, context: Context) => {
      return context.prisma.memberType.findUnique({
        where: { id: source.memberTypeId },
      });
    },
  },
  // Assume there are more fields like 'user', defined similarly
};

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => profileFields,
});
