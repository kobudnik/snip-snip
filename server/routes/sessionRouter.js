const express = require('express');
const sessionRouter = express.Router();
const { veryifyUser } = require('../controllers/sessionController');

sessionRouter.get('/', (req, res) => {
  return res.status(200).json();
});

sessionRouter.post('/', veryifyUser, (req, res) => {
  return res.status(200).json({ username: res.locals.username });
});

module.exports = sessionRouter;
