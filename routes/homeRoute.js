const express = require('express');

const router = express();

//controllers
const {
  getAllQuestions,
  getAllOptions,
  createQuestion,
  addOptions,
  addVote,
  deleteQuestion,
  deleteOption,
  viewQuestion,
} = require('../controller');

router.route('/list/questions').get(getAllQuestions);
router.route('/list/options').get(getAllOptions);
router.route('/questions/:id').get(viewQuestion);
router.route('/questions/create').post(createQuestion);
router.route('/questions/:id/options/create').post(addOptions);
router.route('/options/:id/add_vote').patch(addVote);
router.route('/questions/:id/delete').delete(deleteQuestion);
router.route('/options/:id/delete').delete(deleteOption);

module.exports = router;
