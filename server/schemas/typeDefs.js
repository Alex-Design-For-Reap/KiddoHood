const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Query {
        _: Boolean
    }
    type Mutation {
        _: Boolean
    }
`;

module.exports = typeDefs;
