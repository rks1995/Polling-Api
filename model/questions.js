const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const { type } = require('os');

const questionsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    options: [{}],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Questions', questionsSchema);
