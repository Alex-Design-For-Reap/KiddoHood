const { Event, User, Comment} = require('../models');
// const { formatDate } = require('../utils/formatDate');
const {signToken, AuthenticationError} = require('../utils/auth');
const moment = require('moment');

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
        return User.findOne({ _id: context.user._id }).populate('events');
      }
      throw AuthenticationError;
    },

    // need to chech which one here is working <<<<<<<<<<
    events: async () => {
      const events = await Event.find({})
        .populate({
          path: 'comments',
          populate: {
            path: 'userId',
            select: 'username',
          },
        })
        .populate('userId');
      
      return events.map(event => ({
        ...event._doc,
        eventDate: moment(event.eventDate).format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment(event.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        comments: event.comments.map(comment => ({
          ...comment._doc,
          createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })),
      }));
    },
    
    event: async (parent, { eventId }) => {
      const event = await Event.findById(eventId)
        .populate({
          path: 'comments',
          populate: {
            path: 'userId',
            select: 'username',
          },
        })
        .populate('userId');
      
      return {
        ...event._doc,
        eventDate: moment(event.eventDate).format('YYYY-MM-DD HH:mm:ss'),
        createdAt: moment(event.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        comments: event.comments.map(comment => ({
          ...comment._doc,
          createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        })),
      };
    },
    

    comments: async (parent, { eventId }) => {
      const comments = await Comment.find({ eventId }).populate('userId');
      return comments.map(comment => ({
        ...comment._doc,
        createdAt: moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
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

    deleteUser: async (parent, { userId }, context) => {
      if (context.user) {
        // Find all events created by the user
        const userEvents = await Event.find({ userId });

        // Collect all comment IDs associated with these events
        const commentIds = userEvents.flatMap(event => event.comments);

        // Delete all comments associated with the user's events
        await Comment.deleteMany({ _id: { $in: commentIds } });

        // Delete all events created by the user
        await Event.deleteMany({ userId });

        // Finally, delete the user
        const user = await User.findByIdAndDelete(userId);

        return user;
      }
      throw new AuthenticationError('Not logged in');
    },

    addEvent: async (parent, { title, description, imageUrl, eventDate, location, likesCount = 0 }, context) => {
      console.log(context.user);
      if (context.user) {
        const event = await Event.create({
          title,
          description,
          imageUrl,
          location,
          likesCount,
          eventDate: moment(eventDate).toDate(),
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
          eventDate: moment(eventDate).toDate(),
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

        // Also remove the associated comments
        await Comment.deleteMany({ eventId: id });

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

          // Push the comment to the event's comments array
          await Event.findByIdAndUpdate(
            eventId,
            { $push: { comments: comment._id } },
            { new: true }
          );

          // Populate the user details, especially username
        const populatedComment = await Comment.findById(comment._id).populate('userId');

        return {
          ...populatedComment._doc,
          createdAt: moment(populatedComment.createdAt).format('YYYY-MM-DD HH:mm:ss'),
          // createdAt: formatDate(populatedComment.createdAt),
          username: populatedComment.userId.username, // Extract username from populated userId
        };
      }
      throw AuthenticationError;    
    },
  },
};
module.exports = resolvers;
