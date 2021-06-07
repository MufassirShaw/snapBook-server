import { gql } from 'apollo-server';

export const schema = gql`
  type Query {
    login(email: String!, password: String!): Token!
    Users: [User!]!
  }

  input InputUser {
    email: String!
    username: String!
    password: String!
    firstname: String!
    lastname: String!
  }
  type Token {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  type User {
    email: String!
    username: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  type Mutation {
    createUser(userInput: InputUser): User!
  }
`;
