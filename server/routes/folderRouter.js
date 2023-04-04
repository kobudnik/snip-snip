const express = require('express');
const folderRouter = express.Router();
const { addFolder, getAllFolders } = require('../controllers/folderController');

folderRouter.get('/', getAllFolders, (req, res) => {
  return res.status(200).json(res.locals.allFolders);
});

folderRouter.post('/', addFolder, (req, res) => {
  return res.status(200).json(res.locals.folders);
});

module.exports = folderRouter;
