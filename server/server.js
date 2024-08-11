// server.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const {authMiddleware} = require('./utils/auth');

// Import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');
require('dotenv').config();


const PORT = process.env.PORT || 3001;
const app = express();

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware // check if its ok or not******* <<<<<<<<<<<
});


// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
    await server.start();
    
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    
    app.use('/graphql', expressMiddleware(server, {
      context: authMiddleware
    }));

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));

      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      }
      );
    }
  
    connectDB.once('open', () => {
      app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  };
  
  // Call the async function to start the server
  startApolloServer();
