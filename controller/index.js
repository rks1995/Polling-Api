const Questions = require('../model/questions');
const { StatusCodes } = require('http-status-codes');

const viewQuestion = (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'This is your question' });
};

const createQuestion = async (req, res) => {
  try {
    const newQuestion = await Questions.create(req.body);
    res.status(201).json({
      message: 'question successfully created!',
      question: newQuestion,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'Bad Request' });
  }
};

const addOptions = async (req, res) => {
  try {
    res.status(201).json({ message: 'options added successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

const addVote = (req, res) => {
  res.status(201).json({ message: 'vote added successfully' });
};

const deleteQuestion = (req, res) => {
  res.status(200).json({ message: 'question deleted successfully' });
};

const deleteOption = (req, res) => {
  res.status(200).json({ message: 'options deleted successfully' });
};

module.exports = {
  createQuestion,
  addOptions,
  addVote,
  deleteQuestion,
  deleteOption,
  viewQuestion,
};
