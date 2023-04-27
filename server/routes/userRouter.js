const express = require('express');

const userRouter = express.Router();
const {
  checkExists,
  addUser,
  logoutUser,
} = require('../controllers/userController');
const { hashPassword } = require('../controllers/hashingController');

userRouter.post('/', checkExists, hashPassword, addUser, (req, res) => {
  return res.status(200).json({ message: 'Successfully added user' });
});

userRouter.get('/logout', logoutUser, (req, res) => {
  return res.status(200).json({ message: 'Logged out user successfully.' });
});

module.exports = userRouter;
