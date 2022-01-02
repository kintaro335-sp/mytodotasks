/// <reference path="index.d.ts" />
const dotenv = require('dotenv');
dotenv.config();
// app
const express = require('express');
const app: appT = express();
const port = process.env.SERVER_PORT || 4000;
const routes = require('./app/routes');

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'hola mundo' });
});

routes(app);

app.listen(port, () => {
  console.log('listening on port ' + port);
});
