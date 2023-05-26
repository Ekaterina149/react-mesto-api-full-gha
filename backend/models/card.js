/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" -2'],
      maxlength: [30, 'Максимальная длина поля "name" -30'],
    },
    link: {
      type: String,
      validate: {
        validator(v) {
          return validator.isURL(v, {
            require_protocol: true,
            require_valid_protocol: true,
            require_host: true,
          });
        },
        message: 'Введите корректную ссылку на картинку',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      }],
      default: [],

    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('card', cardSchema);
