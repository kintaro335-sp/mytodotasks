/// <reference path="../../index.d.ts" />
import db from '../libs/mysql/mysqlclient';
import userSchema from '../schemas/users.schema';

class usersService {
  async resgiterUser(user: userO) {
    return new Promise((resolve, reject) => {});
  }
}

module.exports = usersService;
