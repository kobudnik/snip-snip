const express = require('express');
const apiRouter = express.apiRouter();
const path = require('path');

apiRouter.get('/', (req, res) => {
  res.status(200).send({ Hello: 'message' });
});

module.exports = apiRouter;
