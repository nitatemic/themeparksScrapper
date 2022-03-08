/*
 * Fichier qui contient toutes les fonctions de mise à jour de la base de données
 */

require('dotenv').config();

// @ts-ignore
const mysql = require('mysql');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    timezone: 'Europe/Paris',
    skipSetTimezone: true,
});


