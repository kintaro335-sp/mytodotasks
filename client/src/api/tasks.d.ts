type taskT = {
  id: string;
  done: boolean;
  nombre: string;
  descripcion: string;
  fecha: string;
};

type responseT = {
  status: string;
  code: number;
  message: string;
  data: taskT[];
};
