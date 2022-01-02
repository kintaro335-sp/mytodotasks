import config from "./config";
import mysql from 'mysql';

const db = mysql.createConnection(config);

export default db;
