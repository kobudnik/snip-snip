const express = require('express');

const sessionRouter = express.Router();
const {
  veryifyUser,
  checkSessionStatus,
} = require('../controllers/sessionController');

sessionRouter.get('/', (req, res) => {
  return res.status(200).json();
});

sessionRouter.post('/checkStatus', checkSessionStatus, (req, res) => {
  return res.status(200).json({ sessionStatus: 'verified' });
});

sessionRouter.post('/', veryifyUser, (req, res) => {
  return res.status(200).json({ verifiedUser: res.locals.verifiedUser });
});

module.exports = sessionRouter;
