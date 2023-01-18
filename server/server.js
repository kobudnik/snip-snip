const { urlencoded } = require('express');
const express = require('express');
const api = require('./routes/api');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(urlencoded());
app.use('/api', api);
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
