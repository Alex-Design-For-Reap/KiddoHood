const typeDefs = `
  type Event {
    _id: ID!
    title: String!
    description: String!
    imageUrl: String!
    likesCount: Int!
  }

  type Query {
    events: [Event]
    event(id: ID!): Event
  }

  type Mutation {
    addEvent(title: String!, description: String!, imageUrl: String!): Event
  }
`;

module.exports = typeDefs;
