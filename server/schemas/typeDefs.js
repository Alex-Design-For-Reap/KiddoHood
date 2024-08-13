const typeDefs = `


  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    events: [Event]
    comments: [Comment]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Event {
    _id: ID!
    title: String!
    description: String!
    imageUrl: String
    likesCount: Int! # Ensure likesCount is included in the Event type
    eventDate: String!
    createdAt: String!
    location: String!
    userId: User
    comments: [Comment]
  }

type Comment {
    _id: ID!
    text: String!
    userId: User
    eventId: Event
    username: String!
    createdAt: String!
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
    events: [Event]
    event(eventId: ID!): Event
    comments(eventId: ID!): [Comment]
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
      imageUrl: String,
      location: String!,
      eventDate: String!,
      likesCount: Int # Allow likesCount to be passed in the mutation
    ): Event

    updateEvent(
      id: ID!,
      title: String, 
      description: String, 
      imageUrl: String,
      location: String,
      eventDate: String,
      likesCount: Int
    ): Event

    deleteEvent(
      id: ID!
    ): Event

    addComment(
      text: String!,
      userId: ID!,
      eventId: ID!
      username: String! # Include username as an argument
    ): Comment
  }


`;

module.exports = typeDefs;
