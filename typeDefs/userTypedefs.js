export const userTypeDefs = `
  type User {
    id: ID!
    email: String!
    password: String!
  }

  type Token {
    accessToken: String!
    tokenType: String!
    algorithm: String!
    subject: String!
    expiresIn: String!
    userroles: UserRoles
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    accessToken: Token
  }

  enum UserRoles {
    Admin
    Users
  }

  type Query {
    users: [User]
    user(id: ID): User
  }

  type Mutation {
    login( email: String!, password:String!): LoginResponse
  }
`;
