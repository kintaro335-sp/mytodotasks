/// <reference path="index.d.ts" />
const dotenv = require('dotenv');
dotenv.config();
// app
const express = require('express');
const app: appT = express();
const port = process.env.SERVER_PORT || 4000;
const routes = require('./app/routes');
const { errorHandler, logErrors, boomErrorHandler }:any = require('./app/middlewares/error.handler');

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
