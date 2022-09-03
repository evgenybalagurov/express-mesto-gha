require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { NotFoundError } = require('./error/NotFoundError');
const errorHandler = require('./middlewares/error');

const { PORT = 3000 } = process.env;

const app = express();

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mestodb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    console.log('MongoDB connected!');

    await app.listen(PORT);
    console.log(`App listening on port ${PORT}`);
  } catch (err) {
    console.log('Filed to connect:', err.message);
  }
};

connect();

app.use(express.json());
app.use(cookieParser());

app.use(router);

app.use('/*', (req, res, next) => {
  next(new NotFoundError('Page not found'));
});

app.use(errors());

app.use(errorHandler);
