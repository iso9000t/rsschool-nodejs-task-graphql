import { GraphQLEnumType } from 'graphql';
import { MemberTypeId } from '../../../member-types/schemas.js';

const memberTypeIdValues = {
  basic: { value: MemberTypeId.BASIC },
  business: { value: MemberTypeId.BUSINESS },
};

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: memberTypeIdValues,
});
