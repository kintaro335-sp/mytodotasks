/// <reference path="../../index.d.ts" />
import express from 'express';
import { v1 as uuidv1 } from 'uuid';
import boom from '@hapi/boom';
const tasksService = require('../services/tasks.service');
const tasksRouter: routerT = express.Router();
const service = new tasksService();

type params = {
  id: string;
};

tasksRouter.get('/', async (req, res, next) => {
  try {
    const queryParams = req.query;
    const userid = req.session.userid;
    if (!Boolean(userid)) {
      throw boom.unauthorized('unauthorized, please loggig');
    }
    if (queryParams.limit && queryParams.page) {
      queryParams.limit = Number(queryParams.limit);
      queryParams.page = Number(queryParams.page);
      if (isNaN(queryParams.limit)) {
        throw boom.badRequest('param limit is not a number');
      }
      if (isNaN(queryParams.page)) {
        throw boom.badRequest('param page is not a number');
      }
    }
    const data = await service.find({ userid, ...queryParams });
    res.status(200).json({
      status: 'ok',
      code: 200,
      message: 'registros obtenidos',
      data
    });
  } catch (err) {
    next(err);
  }
});

tasksRouter.get('/:id', async (req, res, next) => {
  try {
    const userid = req.session.userid;
    if (!Boolean(userid)) {
      throw boom.unauthorized('unauthorized, please loggig');
    }
    const { id }: params = req.params;
    const data = await service.findOne(id, userid);
    const codeStatus = data === undefined ? 404 : 200;
    const message = data === undefined ? 'not found' : 'found';
    res.status(codeStatus).json({
      status: 'ok',
      code: codeStatus,
      message,
      data: data || {}
    });
  } catch (err) {
    next(err);
  }
});

tasksRouter.post('/', async (req, res, next) => {
  try {
    const userid = req.session.userid;
    if (!Boolean(userid)) {
      throw boom.unauthorized('unauthorized, please loggig');
    }
    const body: taskT = req.body;
    body.id = uuidv1();
    const response: response = await service.create(body, userid);
    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
});

tasksRouter.put('/:id', async (req, res, next) => {
  try {
    const userid = req.session.userid;
    if (!Boolean(userid)) {
      throw boom.unauthorized('unauthorized, please loggig');
    }
    const { id }: params = req.params;
    const body: taskT = req.body;
    body.id = id;
    const response: response = await service.update(body, userid);
    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
});

tasksRouter.delete('/:id', async (req, res, next) => {
  try {
    const userid = req.session.userid;
    if (!Boolean(userid)) {
      throw boom.unauthorized('unauthorized, please loggig');
    }
    const { id }: params = req.params;
    const response: response = await service.delete(id, userid);
    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = tasksRouter;
