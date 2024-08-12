const { Event, User } = require('../models');
const { formatDate } = require('../utils/formatDate');
const {signToken, AuthenticationError} = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
    return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId});
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    events: async () => {
      const events = await Event.find({}).populate('userId').populate('comments');
      return events.map(event => ({
        ...event._doc,
        eventDate: formatDate(event.eventDate),
        createdAt: formatDate(event.createdAt),
      }));
    },
  
    event: async (_, { id }) => {
      const event = await Event.findById(id).populate('userId').populate('comments');
      return {
        ...event._doc,
        eventDate: formatDate(event.eventDate),
        createdAt: formatDate(event.createdAt),
      };
    },
  },

 Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addEvent: async (parent, { title, description, imageUrl, eventDate, location, likesCount = 0 }, context) => {
      if (context.user) {
        const event = await Event.create({
          title,
          description,
          imageUrl,
          eventDate,
          location,
          likesCount,
          createdAt: new Date().toISOString(),
          userId: context.user._id
        });

        // Optionally, update the user's event list
        await User.findByIdAndUpdate(context.user._id, {
          $push: { events: event._id }
        });

        return event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    updateEvent: async (parent, { id, title, description, imageUrl, eventDate, location, likesCount }, context) => {
      if (context.user) {
        const event = await Event.findById(id);

        // Check if the user is the owner of the event
        if (event.userId.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You are not authorized to update this event.');
        }

        // Update event fields
        const updatedEvent = await Event.findByIdAndUpdate(id, {
          title,
          description,
          imageUrl,
          eventDate,
          location,
          likesCount,
        }, { new: true });

        return updatedEvent;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    deleteEvent: async (parent, { id }, context) => {
      if (context.user) {
        const event = await Event.findById(id);

        // Check if the user is the owner of the event
        if (event.userId.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You are not authorized to delete this event.');
        }

        // Remove event
        await Event.findByIdAndDelete(id);

        return event;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};
module.exports = resolvers;
