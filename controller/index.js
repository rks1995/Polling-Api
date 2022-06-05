const Questions = require('../model/questions');
const Options = require('../model/options');
const { StatusCodes } = require('http-status-codes');
const { ObjectId } = require('bson');
const { default: mongoose } = require('mongoose');

// ============================== get All Questions ===========================//
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Questions.find({});
    res.status(StatusCodes.OK).json({ questions: questions });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ message: 'Bad Gateway' });
  }
};

// ============================== view Question ===========================//
const viewQuestion = async (req, res) => {
  try {
    const question = await Questions.findById(req.params.id);
    if (!question) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Question not found!' });
    }
    res.status(200).json({ message: 'Success', question: question });
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({ message: 'Bad Gateway' });
  }
};

// ============================== Create Questions ===========================//
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

// ============================== add options ===========================//
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
    let _id = new mongoose.Types.ObjectId().toHexString();
    let newOption = await Options.create({
      _id: _id,
      question: id,
      text: req.body.text,
      link: `http://localhost:5000/options/${_id}/add_vote`,
    });

    question.options.push(newOption);
    question.save();
    res.status(201).json({ message: 'options added successfully', question });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

// ============================== add vote ===========================//
const addVote = async (req, res) => {
  try {
    const option = await Options.findById(req.params.id);
    if (!option) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Option not found!' });
    }
    const { votes, question } = option;
    const updateOption = await Options.findByIdAndUpdate(
      req.params.id,
      { votes: votes + 1 },
      {
        new: true,
      }
    );

    const questionId = question.toString();

    // update the option in that particular question
    const que = await Questions.findById(questionId);
    const optIndex = que.options.findIndex(
      (item) => item._id.toString() === req.params.id
    );
    que.options[optIndex] = updateOption;
    que.save();
    res.status(201).json({ message: 'vote added successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Bad Request' });
  }
};

// ============================== delete Question ===========================//
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

// ============================== delete option ===========================//
const deleteOption = async (req, res) => {
  try {
    const option = await Options.findByIdAndDelete(req.params.id);

    if (!option) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Option not found!' });
    }

    const questionId = option.question.toString();

    //grab the question and pull out the option from that question
    const question = await Questions.findByIdAndUpdate(questionId, {
      $pull: { options: option },
    });

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
