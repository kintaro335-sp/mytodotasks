type taskT = {
  id: string;
  done: boolean;
  nombre: string;
  descripcion: string;
};

type taskTAdd = {
  done: boolean;
  nombre: string;
  descripcion: string;
};

type responseT = {
  status: string;
  code: number;
  message: string;
  data: taskT[];
};

type responseN = {
  status: string;
  code: number;
  message: string;
  data: taskT[] | taskT;
};
