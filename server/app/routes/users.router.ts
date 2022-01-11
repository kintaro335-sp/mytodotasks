/// <reference path="../../index.d.ts" />
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import boom from '@hapi/boom';
const usersService = require('../services/users.service');
const usersRouter: routerT = express.Router();
const userService = new usersService();

usersRouter.get('/', (req, res, next) => {
  try {
    console.log(req.session);
    res.json({
      message: 'a'
    });
  } catch (err) {
    next(err);
  }
});

usersRouter.post('/', async (req, res, next) => {
  try {
    const user = req.body;
    const resp: response = await userService.login(user);
    const session = req.session;
    session.userid = resp.data;
    resp.data = '';
    res.status(resp.code).json(resp);
  } catch (err) {
    next(err);
  }
});

usersRouter.get('/logout', (req, res, next) => {
  try {
    req.session.destroy();
    res.status(200).json({ message: 'logged out' });
  } catch (err) {
    next(err);
  }
});

usersRouter.post('/register', async (req, res, next) => {
  try {
    const NewUser = req.body;
    NewUser.id = uuidv4();

    const resp: response = await userService.registerUser(NewUser);

    const session = req.session;

    session.userid = NewUser.id;

    res.status(resp.code).json(resp);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
