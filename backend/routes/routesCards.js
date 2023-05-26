const routerCards = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,

} = require('../controllers/cards');

const { createCardJoi, checkCardIdJoi } = require('../middlewares/JoiValidation');

routerCards.get('', getCards);
routerCards.post('', createCardJoi, createCard);
routerCards.delete('/:cardId', checkCardIdJoi, deleteCard);
routerCards.put('/:cardId/likes', checkCardIdJoi, likeCard);
routerCards.delete('/:cardId/likes', checkCardIdJoi, dislikeCard);

module.exports = routerCards;
