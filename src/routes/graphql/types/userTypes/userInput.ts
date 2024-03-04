import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

const createUserFields = {
  name: { type: new GraphQLNonNull(GraphQLString) },
  balance: { type: new GraphQLNonNull(GraphQLFloat) },
};

const changeUserFields = {
  name: { type: GraphQLString },
  balance: { type: GraphQLFloat },
};

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',

  fields: () => createUserFields,
});

export const ChangeUserInputType = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => changeUserFields,
});
