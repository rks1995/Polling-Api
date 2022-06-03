const mongoose = require('mongoose');

const connectDB = (uri) => {
  return mongoose.connect(uri, {
    //to prevent deprecated warning.
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
