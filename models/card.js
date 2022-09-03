const mongoose = require('mongoose');
const { LINK_REGEX } = require('../constants/constants');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Minimum field length "name" - 2'],
    maxlength: [30, 'Maximum field length "name" - 30'],
  },
  link: {
    type: String,
    required: [true, 'The field "link" must be filled'],
    validate: {
      validator(url) {
        return LINK_REGEX.test(url);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
