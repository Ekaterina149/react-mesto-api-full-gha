require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const { createUser, login } = require('./controllers/users');
const { createUserJoi, loginUserJoi } = require('./middlewares/JoiValidation');
const authMiddleware = require('./middlewares/auth');

const app = express();
// eslint-disable-next-line import/no-extraneous-dependencies
const routerUsers = require('./routes/routesUsers');
const routerCards = require('./routes/routesCards');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleErrors } = require('./middlewares/handleErrors');
const NotFoundError = require('./errors/notFoundError');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// подключаемся к базе монго
mongoose.connect('mongodb://127.0.0.1/mestodb', {
  useNewUrlParser: true,
});
// подключим логгер ошибок
app.use(requestLogger);
// подключим cors
app.use(cors({ origin: ['http://localhost:3001', 'http://knifflighexe.nomoredomains.rocks', 'https://knifflighexe.nomoredomains.rocks'], credentials: true }));
// ручка краш-теста сервера
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
// запросы не требующие авторизации
app.post('/signin', loginUserJoi, login);
app.post('/signup', createUserJoi, createUser);
// мидллвар авторизации
app.use(authMiddleware);
// ручка выхода из пользователя
app.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

app.use('/users', routerUsers);
app.use('/cards', routerCards);

// eslint-disable-next-line no-unused-vars
// ручка обработки неизвестного маршрута
// eslint-disable-next-line no-unused-vars
app.use((req, res) => {
  throw new NotFoundError("Sorry can't find that!");
});
// логгер ошибок
app.use(errorLogger);
// обработчик ошибок валидации Joi
app.use(errors({ message: 'Ошибка валидации Joi!' }));
// цетрализованный обработчик ошибок
app.use(handleErrors);
const { PORT = 3000 } = process.env;
// запустим сервер
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
