const Questions = require('../model/questions');
const Options = require('../model/options');
const { StatusCodes } = require('http-status-codes');
const { ObjectId } = require('bson');

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Questions.find({});
    res.status(StatusCodes.OK).json({ questions: questions });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ message: 'Bad Gateway' });
  }
};

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
  const { id } = req.params;
  try {
    //find the question
    const question = await Questions.findById(id);
    if (!question || req.body.text === '') {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Bad Request' });
    }
    //find the options
    const option = await Options.findOne({
      question: new ObjectId(id),
      text: req.body.text,
    });
    if (option) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'options already present' });
    }
    //create options
    let newOption = await Options.create({
      question: id,
      text: req.body.text,
    });

    newOption.link = `http://localhost:5000/options/${newOption.id}/add_vote`;

    question.options.push(newOption);
    question.save();
    res.status(201).json({ message: 'options added successfully', question });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

const addVote = (req, res) => {
  res.status(201).json({ message: 'vote added successfully' });
};

const deleteQuestion = async (req, res) => {
  try {
    //step1 find the question & delete the question from question model
    const question = await Questions.findByIdAndDelete(req.params.id);

    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Question not found!' });
    }

    // step2 delete all the options related to the question from options model
    if (question.options.length > 0) {
      await Options.deleteMany({ question: new ObjectId(req.params.id) });
    }

    res.status(200).json({ message: 'question deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

const deleteOption = async (req, res) => {
  console.log(req.params.id);
  try {
    const option = await Options.findByIdAndDelete(req.params.id);

    if (!option) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Option not found!' });
    }

    const questionId = option.question.toString();

    //grab the question and pull out the option from that question
    const question = await Questions.findById(questionId);

    const newOptions = question.options.filter((item) => {
      return item._id.toString() !== req.params.id;
    });

    question.options = newOptions;
    question.save();
    res.status(200).json({ message: 'options deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

module.exports = {
  getAllQuestions,
  createQuestion,
  addOptions,
  addVote,
  deleteQuestion,
  deleteOption,
  viewQuestion,
};
