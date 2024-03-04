import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { schema } from './schema.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },

    async handler(req) {
      const { query, variables } = req.body;
      const validationResult = validate(schema, parse(query), [depthLimit(5)]);
      if (validationResult.length > 0) {
        return { errors: validationResult };
      }

      return await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: { prisma },
      });
    },
  });
};

export default plugin;
