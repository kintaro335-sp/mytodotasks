/// <reference path="index.d.ts" />
const dotenv = require('dotenv');
dotenv.config();
// app
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const app: appT = express();
const port = process.env.SERVER_PORT || 4000;
const routes = require('./app/routes');
const {
  errorHandler,
  logErrors,
  boomErrorHandler
}: any = require('./app/middlewares/error.handler');

const oneDay = 1000 * 60 * 60 * 24;
const corsOptions = {
  origin: '*',
  credentials: true };
app.use(cors(corsOptions));
app.use(
  sessions({
    secret: process.env.COOKIE_SECRET || 'cat',
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
  })
);
app.use(cookieParser());
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' });
});

routes(app);

//middlewares

app.use(boomErrorHandler);
app.use(errorHandler);
app.use(logErrors);

app.listen(port, () => {
  console.log('listening on port ' + port);
});
