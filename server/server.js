const { urlencoded } = require('express');
const express = require('express');
const api = require('./routes/api');
const path = require('path');

const PORT = 3000;

const app = express();
// app.use(express.static(path.resolve(__dirname, )))
app.use(express.json());
app.use(urlencoded());
app.use('/api', api);
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
