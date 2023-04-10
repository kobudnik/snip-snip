const express = require('express');
const snippedRouter = express.Router();
const snipController = require('../controllers/snipController');

snippedRouter.post('/', snipController.addSnip, (req, res) => {
  return res.status(200).json(res.locals.snipSuccess);
});

snippedRouter.get('/:folder_id', snipController.getSnips, (req, res) => {
  return res.status(200).json(res.locals.allSnips);
});

snippedRouter.delete('/', snipController.deleteSnip, (req, res) => {
  return res.status(200).json(res.locals.remaining_snips);
});
module.exports = snippedRouter;
