import axios from 'axios';
import APIURL from '../config';

export async function login(username: string, password: string) {
  console.log(APIURL);
  await axios
    .post(`${APIURL}/user`, { username, password })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
