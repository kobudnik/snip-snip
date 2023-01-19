const express = require('express');
const apiRouter = express.Router();
const path = require('path');
const snipController = require('../controllers/snipController');

apiRouter.get('/', (req, res) => {
  console.log('in api router');
  return res.status(200).json({ Hello: 'this is the api folder' });
});

apiRouter.post('/', snipController.addUser, (req, res) => {
  console.log('posting api router');
  return res.status(200).json(res.locals.newUser);
});

module.exports = apiRouter;
