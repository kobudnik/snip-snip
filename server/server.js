//IMPORTS
const express = require('express');
const path = require('path');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const snippedRouter = require('./routes/snippedRouter');
const sessionRouter = require('./routes/sessionRouter');
const folderRouter = require('./routes/folderRouter');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const { v4: uuidV4 } = require('uuid');

//SERVER PORT
const PORT = 3000;
// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(cors());

const redisClient = createClient();
redisClient.on('connect', function (err) {
  console.log('Connected to redis successfully');
});
redisClient.connect().catch(console.error);
redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis. ' + err);
});

const redisStore = new RedisStore({ client: redisClient });

//Serve all static files
app.use(express.static(path.resolve(__dirname, '../dist')));

//Initialize sesssion storage.
app.use(
  session({
    genid: () => uuidV4(),
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    name: '_redisDemo',
    secret: 'whatagatabetoosberry',
    resave: false,
    cookie: { secure: false, maxAge: 60000 * 60 * 24 },
    saveUninitialized: false,
  }),
);
//Routes
app.use('/api/snipped', snippedRouter);
app.use('/api/user', userRouter);
app.use('/api/session', sessionRouter);
app.use('/api/folders', folderRouter);

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

//catch all to ensure refresh works
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});

app.listen(PORT, (e) => {
  if (e) console.log(e);
  else {
    console.log(`Server listening on ${PORT}`);
  }
});
