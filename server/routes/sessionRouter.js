const sessionRouter = require('express').Router();
const { veryifyUser } = require('../controllers/sessionController');

sessionRouter.get('/', veryifyUser, (req, res) => {
  return res.status(200).json({ Hello: 'this is the api folder' });
});

sessionRouter.post('/', (req, res) => {
  return res.status(200).json(res.locals.newUser);
});

module.exports = sessionRouter;
