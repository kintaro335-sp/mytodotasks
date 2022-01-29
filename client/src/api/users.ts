/// <reference path="./users.d.ts" />
// eslint-disable-next-line
import axios, { AxiosError } from 'axios';
import APIURL from '../config';
const apiI = axios.create({ withCredentials: true });

export async function login(
  username: string,
  password: string
): Promise<response> {
  return new Promise((resolve, reject) => {
    apiI
      .post(`${APIURL}/user`, { username, password }, { withCredentials: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
}

export async function logout(): Promise<response> {
  return new Promise((resolve, reject) => {
    apiI
      .get(`${APIURL}/user/logout`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
}

export async function isLogged(): Promise<response> {
  return new Promise((resolve, reject) => {
    apiI
      .get(`${APIURL}/user`, { withCredentials: true })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
}

export async function register(
  username: string,
  password: string
): Promise<Response> {
  return new Promise((resolve, reject) => {
    apiI
      .post(
        `${APIURL}/user/register`,
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        resolve(response.data);
      })
      .catch((err: AxiosError) => {
        reject(err);
      });
  });
}
