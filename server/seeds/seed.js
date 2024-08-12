const db = require('../config/connection'); // Correct import
const { User, Event, Comment } = require('../models');
const data = require('./eventData.json'); // Path to your JSON file

const seedDatabase = async () => {
  try {
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
      userId: userMap[findUserByUsername(event.username)] // Use the map to get userId
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
      userId: userMap[findUserByUsername(comment.username)], // Use the map to get userId
      eventId: eventMap[findEventByTitle(comment.eventTitle)] // Use the map to get eventId
    }));
    await Comment.insertMany(comments);

    console.log('Seeding completed!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    db.close(); // Use db.close() instead of mongoose.connection.close()
  }
};

// Helper functions to map usernames to IDs
const findUserByUsername = (username) => {
  return username; // Assuming username directly maps; adjust as needed
};

const findEventByTitle = (title) => {
  return title; // Assuming title directly maps; adjust as needed
};

seedDatabase();
