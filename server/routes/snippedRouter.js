const express = require('express');
const snippedRouter = express.Router();
const path = require('path');
const snipController = require('../controllers/snipController');

snippedRouter.post('/', snipController.addSnip, (req, res) => {
  console.log('in snip Router post');
  return res.status(200).json(res.locals.snipSuccess);
});

snippedRouter.get('/', snipController.getSnips, (req, res) => {
  return res.status(200).json(res.locals.allSnips);
});

module.exports = snippedRouter;
