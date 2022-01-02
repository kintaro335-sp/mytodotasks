import db from '../mysql/mysqlclient';
import taskSchema from '../objects/task';

interface taskI {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: any;
}

class tasksService {
  constructor() {}

  async find(): Promise<Array<taskI>> {
    return new Promise((resolve, reject) =>
      db.query('SELECT * FROM tareas', (err, results) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(results);
        }
      })
    );
  }

  async findOne(id: string): Promise<taskT> {
    return new Promise((resolve, reject) =>
      db.query(`SELECT * FROM tareas WHERE id="${id}"`, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      })
    );
  }

  async create(task: taskT): Promise<response> {
    return new Promise((resolve, reject) =>
      taskSchema
        .validate(task)
        .then(() => {
          const { id, nombre, descripcion, done } = task;
          db.query(
            `INSERT INTO tareas (id, nombre, descripcion, done) VALUES ("${id}", "${nombre}", "${descripcion}", ${done})`,
            (err, results, fie) => {
              if (err) {
                resolve({
                  code: 500,
                  data: task,
                  message: err.message,
                  status: 'error'
                });
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
            status: 'ok'
          });
        })
    );
  }

  async update(task: taskT): Promise<response> {
    return new Promise((resolve, reject) =>
      taskSchema
        .validate(task)
        .then(() => {
          const { nombre, descripcion, done } = task;
          db.query(
            `UPDATE tareas SET nombre="${nombre}", descripcion="${descripcion}", done=${done} WHERE id="${task.id}"`,
            (err, results, fie) => {
              if (err) {
                resolve({
                  status: 'error',
                  code: 500,
                  message: err.message,
                  data: task
                });
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

  async delete(id: string): Promise<response> {
    return new Promise((resolve, reject) =>
      db.query(`DELETE FROM tareas WHERE id="${id}"`, (err, results, fie) => {
        if (err) {
          reject({
            status: 'error',
            code: 500,
            message: `error; ${err.message}`,
            data: id
          });
        } else {
          resolve({
            status: 'ok',
            code: 202,
            message: `deleted`,
            data: id
          });
        }
      })
    );
  }
}

module.exports = tasksService;
