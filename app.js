const express = require('express');
const port = 5000;

const app = express();
const homeRoute = require('./routes/homeRoute');

const pageNotFound = require('./error/pageNotFound');

// parse json data from body
app.use(express.json());

app.use('/api/v1', homeRoute);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(pageNotFound);

app.listen(port, () => {
  console.log(`Server is up and running at port ${port}...`);
});
