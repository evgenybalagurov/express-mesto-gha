const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { NOT_FOUND_CODE } = require('./constants/constants');

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

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5).max(20),
  }),
}), createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('/*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Page not found' });
});

app.use(errors());

app.use(error);
