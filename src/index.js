import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import Dotenv from 'dotenv';

import { schema } from './graphql/schema';
import { resolvers } from './graphql/resolvers';
import { getUserIDFromToken } from './Helpers/auth';

const createSever = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/snapbook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: ({ req }) => {
      // Note: This example uses the `req` argument to access headers,
      // but the arguments received by `context` vary by integration.
      // This means they vary for Express, Koa, Lambda, etc.
      //
      // To find out the correct arguments for a specific integration,
      // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

      // Get the user token from the headers.
      const token = req.headers.authorization || '';

      // Try to retrieve a user with the token
      const user = getUserIDFromToken(token);

      // Add the user to the context
      return { user };
    },
  });

  // The `listen` method launches a web server.
  server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};
Dotenv.config();
createSever();
