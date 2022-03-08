// @ts-ignore
const express = require('express'); // ExpressJS module
const helmet = require('helmet');
const isAliveRoutes = require('./routes/isAlive');
const waitingTimesRoutes = require('./routes/waitingTimes');

// @ts-ignore
const app = express();
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization, Authentication');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', isAliveRoutes);
app.use('/waitingTimes', waitingTimesRoutes);

module.exports = app;
