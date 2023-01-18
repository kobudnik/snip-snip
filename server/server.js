const { urlencoded } = require('express');
const express = require('express');

const PORT = process.env.PORT || 7000;

const app = express();

app.use(express.json());
app.use(urlencoded());
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
