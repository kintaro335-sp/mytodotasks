/// <reference path="../../index.d.ts" />
import db from '../libs/mysql/mysqlclient';
import taskSchema from '../schemas/task';
import boom from '@hapi/boom';
import { decodeBase64, encodeBase64 } from '../utils/base64';

class tasksService {
  constructor() {}

  async find({ userid, limit, page }: queryParamsTask): Promise<taskT[]> {
    const limitP =
      page !== undefined && limit !== undefined
        ? `LIMIT ${page}, ${Number(limit)}`
        : '';
    return new Promise((resolve, reject) =>
      db.query(
        `SELECT * FROM tareas WHERE userid = "${userid}" ${limitP} ORDER BY fecha DESC`,
        (err, results: taskT[]) => {
          if (err) {
            throw boom.internal(err.message, err, 500);
          } else {
            const tasksdecoded = results.map(
              ({ descripcion, id, nombre, done }) => {
                return {
                  descripcion: decodeBase64(descripcion),
                  done,
                  id,
                  nombre
                };
              }
            );
            resolve(tasksdecoded);
          }
        }
      )
    );
  }

  async findOne(id: string, userid: string): Promise<taskT> {
    return new Promise((resolve, reject) =>
      db.query(
        `SELECT * FROM tareas WHERE id="${id}" && userid="${userid}"`,
        (err, results: taskT[]) => {
          if (err) {
            throw boom.internal(err.message, err, 500);
          } else {
            const { descripcion, done, id, nombre } = results[0];
            resolve({
              done,
              id,
              nombre,
              descripcion: decodeBase64(descripcion)
            });
          }
        }
      )
    );
  }

  async create(task: taskT, userid: string): Promise<response> {
    return new Promise((resolve, reject) =>
      taskSchema
        .validate(task)
        .then(() => {
          const { id, nombre, descripcion, done } = task;
          db.query(
            `INSERT INTO tareas (id, nombre, descripcion, done, userid) VALUES ("${id}", "${nombre}", "${encodeBase64(
              descripcion
            )}", ${done}, "${userid}")`,
            (err, results, fie) => {
              if (err) {
                throw boom.internal(err.message, err, 500);
              } else {
                resolve({
                  code: 201,
                  data: task,
                  message: 'created',
                  status: 'ok'
                });
              }
            }
          );
        })
        .catch((err) => {
          resolve({
            code: 400,
            data: task,
            message: err.errors.toString(),
            status: 'error'
          });
        })
    );
  }

  async update(task: taskT, userid: string): Promise<response> {
    return new Promise((resolve, reject) =>
      taskSchema
        .validate(task)
        .then(() => {
          const { nombre, descripcion, done } = task;
          db.query(
            `UPDATE tareas SET nombre="${nombre}", descripcion="${encodeBase64(
              descripcion
            )}", done=${done} WHERE id="${task.id}" && userid="${userid}"`,
            (err, results, fie) => {
              if (err) {
                throw boom.internal(err.message, err, 500);
              } else {
                resolve({
                  status: 'ok',
                  code: 202,
                  message: 'updated',
                  data: task
                });
              }
            }
          );
        })
        .catch((err) => {
          resolve({
            status: 'error',
            code: 400,
            message: err.errors.toString(),
            data: task
          });
        })
    );
  }

  async delete(id: string, userid: string): Promise<response> {
    return new Promise((resolve, reject) =>
      db.query(
        `DELETE FROM tareas WHERE id="${id}" && userid="${userid}"`,
        (err, results, fie) => {
          if (err) {
            throw boom.internal(err.message, err, 500);
          } else {
            resolve({
              status: 'ok',
              code: 202,
              message: `deleted`,
              data: id
            });
          }
        }
      )
    );
  }
}

module.exports = tasksService;
