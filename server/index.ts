// types

// request
type req = {
  params: any;
  query: any;
  body: any;
};
// response
type res = {
  json: Function;
  send: Function;
};
// callback route
type callbakRoute = (req: req, res: res) => void;
// route
type route = (route: string, callback: callbakRoute) => void;

type appT = {
  listen: Function;
  use: Function;
  get: route;
  post: route;
  put: route;
  delete: route;
};

type routerT = {
  use: Function;
  get: route;
  post: route;
  put: route;
  delete: route;
};

const dotenv = require('dotenv');
dotenv.config();
// app
const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 4000;
const routes = require('./app/routes');

app.use(express.json());

app.get('/', (req: any, res: any) => {
  res.json({ message: 'hola mundo' });
});

routes(app);

app.listen(port, () => {
  console.log('listening on port ' + port);
});
