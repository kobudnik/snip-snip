const express = require('express');
const apiRouter = express.Router();
const path = require('path');

apiRouter.get('/', (req, res) => {
  console.log('in api router');
  return res.status(200).json({ Hello: 'message' });
});

module.exports = apiRouter;
