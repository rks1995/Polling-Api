const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    options: [
      {
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
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Questions', questionsSchema);
