// types

// request
type req = {
  params: any;
  query: any;
  body: any;
};
// response
type res = {
  json: Function;
  status: Function;
  send: Function;
};
// callback route
type callbakRoute = (req: req, res: res, next:Function) => void;
// route
type route = (route: string, callback: callbakRoute) => void;

type appT = {
  listen: Function;
  use: Function;
  get: route ;
  post: route;
  put: route ;
  delete: route ;
};

type routerT = {
  use: Function;
  get: route ;
  post: route ;
  put: route ;
  delete: route;
};

type taskT = {
  id: string | undefined;
  done: boolean;
  nombre: string;
  descripcion: string;
};

type response = {
  status: string;
  code : number;
  message: string;
  data: string | Array<taskT> | taskT;
}

interface taskI {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: any;
}

type queryParamsTask = {
  limit: number;
  page: number;
};
