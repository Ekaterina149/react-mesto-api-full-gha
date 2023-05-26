const httpConstants = require('http2').constants;
const ForbiddenError = require('../errors/forbiddenError');
const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const Card = require('../models/card');

const {
  HTTP_STATUS_CREATED,
  HTTP_STATUS_OK,
} = httpConstants;
module.exports.getCards = (req, res, next) => {
  Card.find({}).sort({createdAt: -1})
    .then((cards) => res.status(HTTP_STATUS_OK).send(cards))
    .catch((err) => next(err));
};
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(HTTP_STATUS_CREATED).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        // eslint-disable-next-line no-shadow
        const { name, link } = err.errors;
        const errArray = [name, link];
        const messages = (errArray.filter((element) => element).map((element, index) => (`№${index + 1}. ${element.message}`))).join(', ');
        return next(new BadRequestError(messages.length ? messages : 'Переданы некорректные данные при создании карточки'));
      }
      return next(err);
    });
};
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (String(card.owner) !== String(req.user._id)) {
        throw new ForbiddenError('Недостаточно прав для удаления');
      }
      return card.deleteOne();
    })
    .then((card) => res.status(HTTP_STATUS_OK).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при удалении карточки.'));
      }

      return next(err);
    });
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail()
    .then((card) => res.status(HTTP_STATUS_OK).send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные при постановке лайка'));
      }
      return next(err);
    });
};
module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail()
  .then((card) => res.status(HTTP_STATUS_OK).send(card))
  .catch((err) => {
    if (err.name === 'DocumentNotFoundError') {
      return next(new NotFoundError('Карточка с указанным _id не найдена.'));
    }
    if (err.name === 'CastError') {
      return next(new BadRequestError('Переданы некорректные данные при удалении лайка'));
    }

    return next(err);
  });
