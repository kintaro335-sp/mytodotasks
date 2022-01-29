/// <reference path="../../index.d.ts" />
import db from '../libs/mysql/mysqlclient';
import userSchema, { changePasswordSchema } from '../schemas/users.schema';
import { SHA256 } from 'crypto-js';
import boom from '@hapi/boom';

class usersService {
  async userAlreadyExist(userid: string): Promise<userT> {
    return new Promise((resolve, reject) =>
      db.query(
        `SELECT username from users where id = "${userid}"`,
        (err, results, fie) => {
          if (err) {
            throw boom.internal(err.message, err, 500);
          }
          if (results.length === 0) {
            resolve({ username: '', logged: false });
          } else {
            const username = results[0].username;
            resolve({ username, logged: true });
          }
        }
      )
    );
  }
  async userNameAlreadyExist(username: string) {
    return new Promise((resolve, reject) =>
      db.query(
        `SELECT COUNT(*) AS users from users where username = "${username}"`,
        (err, results, fie) => {
          if (err) {
            throw boom.internal(err.message, err, 500);
          }
          resolve(results[0].users !== 0);
        }
      )
    );
  }

  async login(user: userO): Promise<response> {
    return new Promise((resolve, resject) =>
      userSchema
        .validate(user)
        .then(() => {
          const { username, password } = user;
          const encryptedP = SHA256(password).toString();
          db.query(
            `SELECT id FROM users WHERE username = "${username}" && passwordu = "${encryptedP}" LIMIT 1`,
            (err, results, fie) => {
              if (err) {
                throw boom.internal(err.message, err, 500);
              }
              const userid = results[0]?.id;
              if (!Boolean(userid)) {
                resolve({
                  code: 400,
                  data: undefined,
                  message: 'username or password incorrect',
                  status: 'error'
                });
              }
              resolve({
                code: 200,
                data: userid,
                message: 'logged',
                status: 'ok'
              });
            }
          );
        })
        .catch((err) => {
          resolve({
            code: 400,
            data: '',
            message: err.errors.toString(),
            status: 'error'
          });
        })
    );
  }

  async registerUser(user: userO): Promise<response> {
    return new Promise((resolve, reject) =>
      userSchema
        .validate(user)
        .then(async () => {
          const { id, username, password } = user;
          const encryptedP = SHA256(password).toString();
          const userExist = await this.userNameAlreadyExist(username);
          if (userExist) {
            throw boom.conflict('this user already exist');
          }
          db.query(
            `INSERT INTO users (id, username, passwordu) VALUES ("${id}", "${username}", "${encryptedP}")`,
            (err, results, fie) => {
              if (err) {
                throw boom.internal(err.message, err, 500);
              }
              resolve({
                code: 201,
                data: '',
                message: 'user registred',
                status: 'ok'
              });
            }
          );
        })
        .catch((err) => {
          if (err.isBoom) {
            const out = err.output;
            resolve({
              code: out.statusCode,
              data: '',
              message: out.payload.message,
              status: 'error'
            });
          } else {
            resolve({
              code: 400,
              data: '',
              message: err.errors.toString(),
              status: 'error'
            });
          }
        })
    );
  }

  async setPassword(userid: string, newPassword: string): Promise<response> {
    const newPasswdE = SHA256(newPassword).toString();
    return new Promise((resolve, reject) =>
      db.query(
        `UPDATE users SET passwordu="${newPasswdE}" WHERE id="${userid}"`,
        (err, results, fie) => {
          if (err) {
            throw boom.internal(err.message, err, 500);
          }
          resolve({
            code: 200,
            data: '',
            message: 'password changed',
            status: 'ok'
          });
        }
      )
    );
  }

  async changePassword(user: userCP): Promise<response> {
    return new Promise((resolve, reject) =>
      changePasswordSchema
        .validate(user)
        .then(() => {
          const { userid, password, newPassword } = user;
          db.query(
            `SELECT passwordu FROM users WHERE id="${userid}" LIMIT 1`,
            async (err, results, fie) => {
              if (err) {
                throw boom.internal(err.message, err, 500);
              }
              if (results.length === 0) {
                throw boom.badRequest('user does not exist');
              }
              const passwdu = results[0].passwordu;
              const passwdIn = SHA256(password).toString();
              if (passwdu === passwdIn) {
                resolve(await this.setPassword(userid, newPassword));
              } else {
                resolve({
                  code: 400,
                  data: undefined,
                  message: 'incorrect password',
                  status: 'error'
                });
              }
            }
          );
        })
        .catch((err) => {
          resolve({
            code: 400,
            data: '',
            message: err.errors.toString(),
            status: 'error'
          });
        })
    );
  }
}

module.exports = usersService;
