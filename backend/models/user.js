const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      minlength: [2, 'Минимальная длина поля "name" -2'],
      maxlength: [30, 'Максимальная длина поля "name" -30'],
      default: 'Жак-Ив Кусто',

    },
    about: {
      type: String,
      required: false,
      minlength: [2, 'Минимальная длина поля "about" -2'],
      maxlength: [30, 'Максимальная длина поля "about" -30'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: false,
      validate: {
        validator(v) {
          return validator.isURL(v, {
            require_protocol: true,
            require_valid_protocol: true,
            require_host: true,
          });
        },
        message: 'Введите корректную ссылку на аватар',

      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      validate: {
        validator(v) {
          return validator.isEmail(v, { allow_utf8_local_part: false });
        },
        message: 'Введите корректную почту',
      },
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);
module.exports = mongoose.model('user', userSchema);
