const express = require('express');
// const api = require('./routes/api');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/api');
const snippedRouter = require('./routes/snippedRouter');
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/snipped/', snippedRouter);
app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'Global error handler invoked' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
