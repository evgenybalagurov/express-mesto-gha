const mongoose = require('mongoose');
const validator = require('validator');
const { LINK_REGEX } = require('../constants/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'The field "email" must be filled'],
    validate: [validator.isEmail, 'Invalid email address'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The field "password" must be filled'],
    select: false,
  },
  name: {
    type: String,
    minlength: [2, 'Minimum field length "name" - 2'],
    maxlength: [30, 'Maximum field length "name" - 30'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Minimum field length "about" - 2'],
    maxlength: [30, 'Maximum field length "about" - 30'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return LINK_REGEX.test(url);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
});

userSchema.methods.toJSON = function deletePassword() {
  const user = this.toObject();

  delete user.password;

  return user;
};

module.exports = mongoose.model('user', userSchema);
