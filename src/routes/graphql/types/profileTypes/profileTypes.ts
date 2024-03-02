import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UUIDType } from '../uuid.js';
import { MemberType } from '../memberTypes/memberTypes.js';
import { Context } from '../interfaces.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: function () {
    return {
      id: { type: new GraphQLNonNull(UUIDType) },
      isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
      yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
      userId: { type: new GraphQLNonNull(UUIDType) },
      memberType: {
        type: new GraphQLNonNull(MemberType),
        resolve: async function (
          source: { memberTypeId: string },
          _args,
          context: Context,
        ) {
          return await context.prisma.memberType.findUnique({
            where: { id: source.memberTypeId },
          });
        },
      },
      // more fields, like 'user'
    };
  },
});
