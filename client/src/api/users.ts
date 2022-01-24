import axios from 'axios';
import APIURL from '../config';
const apiI = axios.create({ withCredentials: true });

export async function login(username: string, password: string) {
  await apiI
    .post(`${APIURL}/user`, { username, password }, { withCredentials: true })
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function isLogged(): Promise<any> {
  return new Promise((resolve, reject) => {
    apiI
      .get(`${APIURL}/user`, { withCredentials: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
