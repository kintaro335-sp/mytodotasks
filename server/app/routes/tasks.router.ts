/// <reference path="../../index.d.ts" />
import express from 'express';
import { v1 as uuidv1 } from 'uuid';
const tasksService = require('../services/tasks.service');
const tasksRouter: routerT = express.Router();
const service = new tasksService();

type params = {
  id: string;
};

tasksRouter.get('/', (req, res) => {
  const data = service.find();
  res.status(200).json({
    status: 'ok',
    code: 200,
    message: 'registros obtenidos',
    data
  });
});

tasksRouter.get('/:id', (req, res) => {
  const { id }: params = req.params;
  const data = service.findOne(id);
  const codeStatus = data === undefined ? 404 : 200;
  const message = data === undefined ? 'not found' : 'found';
  res.status(codeStatus).json({
    status: 'ok',
    code: codeStatus,
    message,
    data: data || {}
  });
});

tasksRouter.post('/', (req, res) => {
  const body: taskT = req.body;
  body.id = uuidv1();
  const response: response = service.create(body);
  res.status(response.code).json(response);
});

tasksRouter.put('/:id', (req, res) => {
  const { id }: params = req.params;
  const body: taskT = req.body;
  body.id = id;
  const response: response = service.update(body);
  res.status(response.code).json(response);
});

tasksRouter.delete('/:id', (req, res) => {
  const { id }: params = req.params;
  const response: response = service.delete(id);
  res.status(response.code).json(response);
});

module.exports = tasksRouter;
