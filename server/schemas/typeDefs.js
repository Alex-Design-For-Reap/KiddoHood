const typeDefs = `


  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    events: [Event]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    imageUrl: String!
    likesCount: Int! # Ensure likesCount is included in the Event type
    eventDate: String!
    createdAt: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
    events: [Event]
    event(id: ID!): Event
  }

  type Mutation {
    addUser(
      username: String!, 
      email: String!, 
      password: String!
    ): Auth

    login(
      email: String!, 
      password: String!
    ): Auth

    addEvent(
      title: String!, 
      description: String!, 
      imageUrl: String!,
      eventDate: String!
      likesCount: Int # Allow likesCount to be passed in the mutation
    ): Event
  }
`;

module.exports = typeDefs;
