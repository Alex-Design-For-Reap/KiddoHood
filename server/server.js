// server.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

// Import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // This is where you can add context like the authenticated user
    // For example: const token = req.headers.authorization || '';
  }

});

const app = express();

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
    await server.start();
    
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    
    app.use('/graphql', expressMiddleware(server));
  
    connectDB.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  };
  
  // Call the async function to start the server
  startApolloServer();
