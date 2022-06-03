const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema(
  {
    question: {
      type: mongoose.Types.ObjectId,
      ref: 'Questions',
    },

    text: {
      type: String,
      unique: true,
      required: true,
    },
    votes: {
      type: Number,
      default: 0,
    },

    link: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Options', optionsSchema);
