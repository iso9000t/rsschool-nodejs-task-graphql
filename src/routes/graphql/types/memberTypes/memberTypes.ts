import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberTypeIdEnum } from './memberTypeIdEnum.js';


export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: function () {
    return {
      id: { type: MemberTypeIdEnum },
      discount: { type: new GraphQLNonNull(GraphQLFloat) },
      postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
    };
  },
});

