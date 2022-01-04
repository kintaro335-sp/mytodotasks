/// <reference path="../../index.d.ts" />

function logErrors(err: any, req: req, res: res, next: Function) {
  console.error(err);
  next(err);
}

function errorHandler(err: any, req: req, res: res, next: Function) {
  res.status(500).json({
    code: 500,
    data: null,
    message: err.message,
    status: 'error'
  });
}

function boomErrorHandler(err: any, req: req, res: res, next: Function) {
  if (err.isboom) {
    const { output } = err;
    res.status(output.statusCode).json(output);
  }
  next(err);
}
export = { logErrors, errorHandler, boomErrorHandler };
