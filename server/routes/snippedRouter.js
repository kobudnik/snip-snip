const express = require('express');

const snippedRouter = express.Router();
const {
  addSnip,
  getSnips,
  deleteSnip,
  moveSnip,
  updateSnip,
} = require('../controllers/snipController');

snippedRouter.post('/', addSnip, (req, res) => {
  return res.status(200).json(res.locals.snipSuccess);
});

snippedRouter.get('/:folderID', getSnips, (req, res) => {
  return res.status(200).json(res.locals.allSnips);
});

snippedRouter.delete('/', deleteSnip, (req, res) => {
  return res.status(200).json(res.locals.remainingSnips);
});

snippedRouter.put('/', moveSnip, (req, res) => {
  return res.status(200).json(res.locals.remainingSnips);
});

snippedRouter.patch('/', updateSnip, (req, res) => {
  return res.status(200).json(res.locals.remainingSnips);
});

module.exports = snippedRouter;
