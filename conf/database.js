const mysql = require('mysql2');

const con = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'Pizza@163',
  database: 'mydb',
  queueLimit: 0,
  waitForConnections: true,
  connectionLimit: 20
});

const promistPool = con.promise();


module.exports = promistPool;