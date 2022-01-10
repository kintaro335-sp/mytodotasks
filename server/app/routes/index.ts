const tasksRouter = require('./tasks.router');
const usersRouter = require('./users.router');

function routerApi(app: appT) {
  app.use('/tasks', tasksRouter);
  app.use('/user', usersRouter);
}

module.exports = routerApi;
