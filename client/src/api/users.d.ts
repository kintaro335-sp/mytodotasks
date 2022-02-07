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

