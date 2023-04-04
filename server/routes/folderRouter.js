const express = require('express');
const folderRouter = express.Router();
const { addFolder } = require('../controllers/folderController');

// folderRouter.get('/', (req, res) => {
//   return res.status(200).json({ Message: 'this is the folderfolder' });
// });

folderRouter.post('/', addFolder, (req, res) => {
  return res.status(200).json(res.locals.folders);
});

module.exports = folderRouter;
