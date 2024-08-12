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
      throw AuthenticationError('You need to be logged in!');
    },

    events: async () => {
      const events = await Event.find({});
      return events.map(event => ({
        ...event._doc,
        eventDate: formatDate(event.eventDate),
        createdAt: formatDate(event.createdAt),
      }));
    },
    event: async (_, { id }) => {
      const event = await Event.findById(id);
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
        throw AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },


    addEvent: async (parent, { title, description, imageUrl, eventDate, likesCount = 0 }, context) => {
      
      if (context.user) {
        const event = await Event.create({
          title,
          description,
          imageUrl,
          eventDate,
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
  }
};

module.exports = resolvers;
