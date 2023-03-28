const express = require('express');
const path = require('path');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const snippedRouter = require('./routes/snippedRouter');
const sessionRouter = require('./routes/sessionRouter');
const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

//Serve all static files
app.use(express.static(path.resolve(__dirname, '../dist')));

//Routes
app.use('/api/snipped', snippedRouter);
app.use('/api/user', userRouter);
app.use('/api/session', sessionRouter);

//Global Error Handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'Global error handler invoked' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, (e) => {
  if (e) console.log(e);
  else {
    console.log(`Server listening on ${PORT}`);
  }
});
