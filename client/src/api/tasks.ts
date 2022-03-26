/// <reference path="./tasks.d.ts" />
import axios from 'axios';
import APIURL from '../config';

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

export async function updateTask(task: taskT): Promise<responseN> {
  const { id, nombre, descripcion, done } = task;
  return new Promise((resolve, reject) => {
    apiT
      .put(`${APIURL}/tasks/${id}`, { nombre, descripcion, done })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function addTask(task: taskTAdd): Promise<responseN> {
  const { done, nombre, descripcion } = task;
  return new Promise((resolve, reject) => {
    apiT
      .post(`${APIURL}/tasks`, { done, nombre, descripcion })
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function deleteTask(id: string): Promise<responseN> {
  return new Promise((resolve, reject) => {
    apiT
      .delete(`${APIURL}/tasks/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
