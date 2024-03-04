import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberTypeIdEnum } from './memberTypeIdEnum.js';

function defineFields() {
  const fields = {
    id: { type: MemberTypeIdEnum },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  };
  return fields;
}

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: defineFields,
});
