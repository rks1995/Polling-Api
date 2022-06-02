require('dotenv').config();
const express = require('express');
const port = 5000;

const app = express();
const homeRoute = require('./routes/homeRoute');
const connectDB = require('./db/config');
const pageNotFound = require('./error/pageNotFound');
const { stat } = require('fs');

// parse json data from body
app.use(express.json());

app.use('/api/v1', homeRoute);

app.get('/', (req, res) => {
  res.send('hello world');
});

app.use(pageNotFound);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_DB_URI);
    app.listen(port, () => {
      console.log(`Server is up and running at port ${port}...`);
    });
  } catch (error) {
    console.log('Error', error);
  }
};

start();
