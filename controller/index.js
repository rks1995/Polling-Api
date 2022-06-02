const viewQuestion = (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'This is your question' });
};

const createQuestion = (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: 'question successfully created!' });
};

const addOptions = (req, res) => {
  res.status(201).json({ message: 'options added successfully' });
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
