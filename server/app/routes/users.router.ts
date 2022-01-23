/// <reference path="../../index.d.ts" />
import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import boom from '@hapi/boom';
const usersService = require('../services/users.service');
const usersRouter: routerT = express.Router();
const userService = new usersService();

usersRouter.get('/', async (req, res, next) => {
  try {
    const userid = req.session.userid;
    if (!userid) {
      const response: response = {
        code: 200,
        data: false,
        message: 'not logged',
        status: 'ok'
      };
      res.json(response);
    } else {
      const response: response = {
        code: 200,
        data: true,
        message: '',
        status: 'ok'
      };
      const userExist = await userService.userAlreadyExist(userid);
      response.data = userExist;
      res.json(response);
    }
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
    session.datelogged = new Date();
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

usersRouter.put('/password', async (req, res, next) => {
  try {
    const userid = req.session.userid;
    if (!userid) {
      throw boom.badRequest('you must loggin first');
    }
    const userCP = req.body;
    userCP.userid = userid;
    const resp: response = await userService.changePassword(userCP);
    res.status(resp.code).json(resp);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
