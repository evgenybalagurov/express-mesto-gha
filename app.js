const express = require('express');
const mongoose = require('mongoose');
const { login, createUser } = require('./controllers/users');
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

app.use((req, res, next) => {
  req.user = {
    _id: '6302157849e41ed41901507d',
  };

  next();
});

app.use(express.json());

app.use('/signin', login);
app.use('/signup', createUser);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('/*', (req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Page not found' });
});
