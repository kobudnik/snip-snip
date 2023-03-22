const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.get('/', (req, res) => {
  return res.status(200).json({ Hello: 'this is the api folder' });
});

userRouter.post('/', userController.addUser, (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

module.exports = userRouter;
