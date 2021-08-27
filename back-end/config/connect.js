const mysql = require('mysql2/promise');
const { 
  HOSTNAME,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_PORT
} = require('./application');

const connection = mysql.createPool({
  host: HOSTNAME,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  port: MYSQL_PORT,
});

module.exports = connection;
