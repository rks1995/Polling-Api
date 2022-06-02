const express = require('express');

const router = express();

router.post('/questions/create', (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: 'question successfully created!' });
});

module.exports = router;
