import { gql } from 'apollo-server';

export const schema = gql`
   type Query{
    
   }

  input InputUser {
    email: String!
    username: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  type User {
    email: String!
    username: String!
    password: String!
    firstname: String!
    lastname: String!
  }

  type Mutation {
    createUser(user: InputUser): User!
  }
`;
