// server.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const { authMiddleware } = require('./utils/auth');

// Import typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const connectDB = require('./config/connection');
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Configure multer for file uploads with default storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'upload')); // Save to 'upload' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename with timestamp
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Configure multer for file uploads
// const upload = multer({ dest: path.join(__dirname, 'upload') });

// Use CORS middleware to allow requests from different origins
app.use(cors());

// Initialize Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Set up file upload route
  app.post('/upload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      res.json({ filePath: `/upload/${req.file.filename}` });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'An error occurred during file upload' });
    }
  });

  // Serve static files from 'uploads' directory
  app.use('/upload', express.static(path.join(__dirname, 'upload')));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
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
