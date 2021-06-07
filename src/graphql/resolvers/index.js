import { AuthMutations, AuthQueries } from './auth';

export const resolvers = {
  Query: {
    ...AuthQueries,
  },
  Mutation: {
    ...AuthMutations,
  },
};
