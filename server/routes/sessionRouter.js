const express = require('express');
const sessionRouter = express.Router();
const { veryifyUser } = require('../controllers/sessionController');

sessionRouter.get('/', (req, res) => {
  return res.status(200).json({ Hello: 'this is the api folder' });
});

sessionRouter.post('/', veryifyUser, (req, res) => {
  return res.status(200).json({ login: 'successful' });
});

module.exports = sessionRouter;
