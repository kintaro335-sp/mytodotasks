type userT = {
  username: string;
  logged: boolean;
};

type response = {
  status: string;
  code: number;
  message: string;
  data: userT;
};

interface taskI {
  id: string;
  nombre: string;
  descripcion: string;
  fecha: any;
}

type taskT = {
  id: string | undefined;
  done: boolean;
  nombre: string;
  descripcion: string;
};
