import express from 'express';
import db from '../mysql/mysqlclient';
import { v1 as uuidv1 } from 'uuid';
import taskSchema from '../objects/task';
const tasksRouter: routerT = express.Router();

type taskT = {
  id: string | undefined;
  done: boolean;
  nombre: string;
  descripcion: string;
};

type params = {
  id: string;
};

tasksRouter.get('/', (req, res) => {
  db.query('SELECT * FROM tareas', (err, results, fie) => {
    if (err) {
      res
        .status(500)
        .json({ status: 'error', code: 500, message: err, data: [] });
    }
    res.status(200).json({
      status: 'ok',
      code: 200,
      message: 'registros obtenidos',
      data: results
    });
  });
});

tasksRouter.get('/:id', (req, res) => {
  const { id }: params = req.params;
  db.query(
    `SELECT * FROM tareas WHERE id = "${id}" limit 1`,
    (err, results, fie) => {
      if (err) {
        res.status(500).json({
          status: 'error',
          message: `error: ${err.message}`,
          code: 500,
          data: {}
        });
      }
      const codeStatus = results[0] === undefined ? 404 : 200;
      const message = results[0] === undefined ? 'not found' : 'found';
      res.status(200).json({
        status: 'ok',
        code: codeStatus,
        message,
        data: results[0] || {}
      });
    }
  );
});

tasksRouter.post('/', (req, res) => {
  const body: taskT = req.body;
  body.id = uuidv1();
  taskSchema.isValid(body).then((isValid) => {
    if (isValid) {
      const { id, nombre, descripcion, done } = body;
      db.query(
        `INSERT INTO tareas (id, nombre, descripcion, done) VALUES ("${id}", "${nombre}", "${descripcion}", ${done})`,
        (err, results, fie) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              code: 500,
              message: `error; ${err.message}`,
              data: body
            });
          }
          res.status(201).json({
            status: 'ok',
            code: 201,
            message: `created`,
            data: body
          });
        }
      );
    } else {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'error: no valid data',
        data: body
      });
    }
  });
});

tasksRouter.put('/:id', (req, res) => {
  const { id }: params = req.params;
  const body: taskT = req.body;
  taskSchema.isValid(body).then((isValid) => {
    if (isValid) {
      const { nombre, descripcion, done } = body;
      db.query(
        `UPDATE tareas SET nombre="${nombre}", descripcion="${descripcion}", done=${done} WHERE id="${id}"`,
        (err, results, fie) => {
          if (err) {
            res.status(500).json({
              status: 'error',
              code: 500,
              message: `error; ${err.message}`,
              data: body
            });
          }
          res.status(202).json({
            status: 'ok',
            code: 202,
            message: `updated`,
            data: body
          });
        }
      );
    } else {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'error: no valid data',
        data: body
      });
    }
  });
});

tasksRouter.delete('/:id', (req, res) => {
  const { id }: params = req.params;
  db.query(`DELETE FROM tareas WHERE id="${id}"`, (err, results, fie) => {
    if (err) {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: `error; ${err.message}`,
        data: id
      });
    }
    res.status(202).json({
      status: 'ok',
      code: 202,
      message: `deleted`,
      data: id
    });
  });
});

module.exports = tasksRouter;
