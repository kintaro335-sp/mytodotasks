/// <reference path="../../index.d.ts" />
import express, { response } from 'express';
import { v1 as uuidv1 } from 'uuid';
import boom from '@hapi/boom';
const usersRouter: routerT = express.Router();


usersRouter.get('/', (req, res) => {

  console.log(req.cookies);

  res.json({
    user: 'a'
  })
});

usersRouter.post('/register', (req, res, next) => {
  const { user, password } = req.body;

  const session = req.session;
  session.username = user;

  res.status(200).json({
    data: { user, password }
  });
});

module.exports = usersRouter;
