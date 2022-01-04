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
    const data = await service.find(queryParams);
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
    const { id }: params = req.params;
    const data = await service.findOne(id);
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
    const body: taskT = req.body;
    body.id = uuidv1();
    const response: response = await service.create(body);
    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
});

tasksRouter.put('/:id', async (req, res, next) => {
  try {
    const { id }: params = req.params;
    const body: taskT = req.body;
    body.id = id;
    const response: response = await service.update(body);
    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
});

tasksRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id }: params = req.params;
    const response: response = await service.delete(id);
    res.status(response.code).json(response);
  } catch (err) {
    next(err);
  }
});

module.exports = tasksRouter;
