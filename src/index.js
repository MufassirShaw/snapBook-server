import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import typeDefs from './graphql/schema';
import { rootResolver } from './graphql/resolvers';

const createSever = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/snapbook', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const server = new ApolloServer({ typeDefs, resolvers: rootResolver });

  // The `listen` method launches a web server.
  server.listen({ port: 4001 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

createSever();
