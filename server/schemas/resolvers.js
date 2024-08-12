const { Event, User, Comment} = require('../models');
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
      throw AuthenticationError;
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

    comments: async (parent, { eventId }) => {
      const comments = await Comment.find({ eventId }).populate('userId');
      return comments.map(comment => ({
        ...comment._doc,
        createdAt: formatDate(comment.createdAt),
      }));
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },

    addEvent: async (parent, { title, description, imageUrl, eventDate, location, likesCount = 0 }, context) => {
      console.log('Context User', context.user);
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
      throw AuthenticationError;
    },

    updateEvent: async (parent, { id, title, description, imageUrl, eventDate, location, likesCount }, context) => {
      if (context.user) {
        const event = await Event.findById(id);

        // Check if the user is the owner of the event
        if (event.userId.toString() !== context.user._id.toString()) {
          throw AuthenticationError;
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
      throw AuthenticationError;
    },

    deleteEvent: async (parent, { id }, context) => {
      if (context.user) {
        const event = await Event.findById(id);

        // Check if the user is the owner of the event
        if (event.userId.toString() !== context.user._id.toString()) {
          throw AuthenticationError;
        }

        // Remove event
        await Event.findByIdAndDelete(id);

        return event;
      }
      throw AuthenticationError;
    },

    addComment: async (parent, { text, eventId }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          text,
          userId: context.user._id,
          eventId,
        });

        return {
          ...comment._doc,
          createdAt: formatDate(comment.createdAt),
        };
      }
      throw AuthenticationError;
    },
  },
};
module.exports = resolvers;
