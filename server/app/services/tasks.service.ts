import db from '../mysql/mysqlclient';
import taskSchema from '../objects/task';

interface taskI {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: any;
}

class tasksService {
  tasks: Array<taskI>;
  res: response;

  constructor() {
    this.tasks = <any>[];
    this.res = <response>{ code: 200, data: [], status: '', message: '' };
    this.getTasks();
  }

  setRes(res: response) {
    this.res = res;
  }
  getRes(): response {
    return this.res;
  }

  getTasks() {
    db.query('SELECT * FROM tareas', async (err, results) => {
      if (err) {
        console.log(err);
      }
      this.tasks = (await results) || [];
    });
  }

  find() {
    this.getTasks();
    return this.tasks;
  }

  findOne(id: string) {
    this.getTasks();
    return this.tasks.filter((task) => task.id === id);
  }

  create(task: taskT) {
    taskSchema.isValid(task).then((isValid) => {
      if (isValid) {
        const { id, nombre, descripcion, done } = task;
        db.query(
          `INSERT INTO tareas (id, nombre, descripcion, done) VALUES ("${id}", "${nombre}", "${descripcion}", ${done})`,
          (err, results, fie) => {
            if (err) {
              this.setRes({
                code: 500,
                data: task,
                message: err.message,
                status: 'error'
              });
            } else {
              this.setRes({
                code: 201,
                data: task,
                message: 'created',
                status: 'ok'
              });
            }
          }
        );
      } else {
        this.setRes({
          code: 400,
          data: task,
          message: 'no valid data',
          status: 'ok'
        });
      }
    });
    return this.getRes();
  }

  update(task: taskT) {
    taskSchema.isValid(task).then((isValid) => {
      if (isValid) {
        const { nombre, descripcion, done } = task;
        db.query(
          `UPDATE tareas SET nombre="${nombre}", descripcion="${descripcion}", done=${done} WHERE id="${task.id}"`,
          (err, results, fie) => {
            if (err) {
              this.setRes({
                status: 'error',
                code: 500,
                message: `error; ${err.message}`,
                data: task
              });
            } else {
              this.setRes({
                status: 'ok',
                code: 202,
                message: `updated`,
                data: task
              });
            }
          }
        );
      } else {
        this.setRes({
          status: 'error',
          code: 500,
          message: 'error: no valid data',
          data: task
        });
      }
    });
    return this.getRes();
  }

  delete(id: string): response {
    db.query(`DELETE FROM tareas WHERE id="${id}"`, (err, results, fie) => {
      if (err) {
        this.setRes({
          status: 'error',
          code: 500,
          message: `error; ${err.message}`,
          data: id
        });
      } else {
        this.setRes({
          status: 'ok',
          code: 202,
          message: `deleted`,
          data: id
        });
      }
    });
    return this.getRes();
  }
}

module.exports = tasksService;
