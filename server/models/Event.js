const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  likesCount: {
    type: Number,
    default: 0,
  },
});

const Event = model('Event', eventSchema);

module.exports = Event;
