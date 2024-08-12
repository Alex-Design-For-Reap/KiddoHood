
// const db = require('../config/connection');
// const { Event} = require('../models');
// const cleanDB = require('./cleanDB');

// const eventData = require('./eventData.json');
// // const classData = require('./classData.json');
// // const professorData = require('./professorData.json');

// db.once('open', async () => {
//   // clean database
//   await cleanDB("Event", "events");
//   // await cleanDB("Class", "classes");
//   // await cleanDB("Professor", "professors");

//   // bulk create each model
//   const events = await Event.insertMany(eventData);

//   console.log('all done!');
//   process.exit(0);
// });

const db = require('../config/connection');
// const mongoose = require('mongoose');
const { User, Event, Comment } = require('../models');
const data = require('./eventData.json'); // Path to your JSON file

const seedDatabase = async () => {
  try {
    // Connect to the database
    // await db.connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });
    
    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Comment.deleteMany({});
    
    // Seed users
    const users = await User.insertMany(data.users);
    
    // Map user IDs for future use
    const userMap = users.reduce((map, user) => {
      map[user.username] = user._id;
      return map;
    }, {});

    // Seed events
    const events = data.events.map(event => ({
      ...event,
      userId: userMap[findUserByUsername(event.username)] // Replace with actual user ID
    }));
    const createdEvents = await Event.insertMany(events);

    // Map event IDs for future use
    const eventMap = createdEvents.reduce((map, event) => {
      map[event.title] = event._id;
      return map;
    }, {});

    // Seed comments
    const comments = data.comments.map(comment => ({
      ...comment,
      userId: userMap[findUserByUsername(comment.username)], // Replace with actual user ID
      eventId: eventMap[findEventByTitle(comment.eventTitle)] // Replace with actual event ID
    }));
    await Comment.insertMany(comments);

    console.log('Seeding completed!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
};

// Helper functions to map usernames to IDs
const findUserByUsername = (username) => {
  // Implement this function to return a username from the map
};

const findEventByTitle = (title) => {
  // Implement this function to return an event title from the map
};

seedDatabase();
