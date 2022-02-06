/// <reference path="./tasks.d.ts" />
import axios from 'axios';
import APIURL from 'src/config';

const apiT = axios.create({ withCredentials: true });

export async function getTasks(): Promise<responseT> {
  return new Promise((resolve, reject) => {
    apiT
      .get(`${APIURL}/tasks`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
