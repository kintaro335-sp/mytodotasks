const tasksRouter = require("./tasks.router");

function routerApi(app: appT) {
  app.use('/tasks', tasksRouter)
}

module.exports = routerApi;
