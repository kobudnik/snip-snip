const express = require('express');
const snippedRouter = express.Router();
const path = require('path');
const snipController = require('../controllers/snipController');

snippedRouter.post('/', snipController.addSnip, (req, res) => {
  console.log('in snip post');
  return res.status(200).json('sup');
});

module.exports = snippedRouter;
