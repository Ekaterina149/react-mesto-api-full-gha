const routerUsers = require('express').Router();

// const Card = require('../models/user');
const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const { getUserByIdJoi, updateAvatarJoi, updateUserJoi } = require('../middlewares/JoiValidation');

routerUsers.get('', getUsers);
routerUsers.get('/me', getCurrentUser);
routerUsers.get('/:userId', getUserByIdJoi, getUser);
routerUsers.patch('/me', updateUserJoi, updateUser);
routerUsers.patch('/me/avatar', updateAvatarJoi, updateAvatar);

module.exports = routerUsers;
