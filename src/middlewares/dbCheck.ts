require('dotenv').config();

const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  timezone: 'Europe/Paris',
  skipSetTimezone: true,
});

// Fonction qui check si la base de données est connectée
exports.isAlive = () => {
  pool.getConnection((err, connection) => {
    if (err == null) {
      connection.release();
      return true;
    }
    return false;
  });
};
