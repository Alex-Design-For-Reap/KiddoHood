const {Event} = require('../models');

const resolvers = {
  Query: {
    events: async () => {
      return await Event.find({});
    },
    event: async (_, { id }) => {
      return await Event.findById(id);
    },
  },
  Mutation: {
    addEvent: async (_, { title, description, imageUrl }) => {
      const newEvent = new Event({
        title,
        description,
        imageUrl,
        likesCount: 0, // default value
      });
      return await newEvent.save();
    },
  },
};

module.exports = resolvers;
