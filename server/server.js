const express = require('express');
// const api = require('./routes/api');
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/api');

const PORT = 3000;

const app = express();
// app.use(express.static(path.resolve(__dirname, )))
app.use(express.json());
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
