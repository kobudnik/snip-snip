const express = require('express');
const snippedRouter = express.Router();
const snipController = require('../controllers/snipController');

snippedRouter.post('/', snipController.addSnip, (req, res) => {
  return res.status(200).json(res.locals.snipSuccess);
});

snippedRouter.get('/', snipController.getSnips, (req, res) => {
  return res.status(200).json(res.locals.allSnips);
});

module.exports = snippedRouter;
