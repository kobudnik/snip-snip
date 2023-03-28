const express = require('express');
const userRouter = express.Router();
const { checkExists, addUser } = require('../controllers/userController.js');
const { hashPassword } = require('../controllers/hashingController.js');

userRouter.get('/', (req, res) => {
  return res.status(200).json({ Message: 'this is the api folder' });
});

userRouter.post('/', checkExists, hashPassword, addUser, (req, res) => {
  return res.status(200).json({ message: 'Successfully added user' });
});

module.exports = userRouter;
