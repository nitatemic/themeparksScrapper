/*
 * Fichier qui contient toutes les fonctions de récupération de données de la base de données
 */

require('dotenv').config();

// @ts-ignore
const mysql = require('mysql');

// @ts-ignore
const getPool = mysql.createPool({
    connectionLimit: 5,
    waitForConnections: true,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    timezone: 'Europe/Paris',
    skipSetTimezone: true,
});

/*
 * Fonction qui récupérer tout les ID des parcs dans la table parks.
 * Et les renvoie sous forme de tableau
 */
exports.getAllParksID = function () {
    return new Promise((resolve, reject) => {
        getPool.getConnection((err, connection) => {
            if (err) {
                connection.release();
                reject(err);
            } else {
                connection.query('SELECT APIID FROM parks', (err, rows) => {
                    if (err) {
                        connection.release();
                        reject(err);
                    } else {
                        connection.release();
                        resolve(rows);
                    }
                });
            }
        });
    });
};

exports.APIIDToExperienceID = async (APIID) => {
    getPool.getConnection((err, connection) => {
        connection.query(`SELECT experienceID
                          FROM experiences
                          WHERE APIID = ${getPool.escape(APIID)};`,
            (err, result) => {
                if (err) {
                    connection.release();
                    throw err;
                } else {
                    connection.release();
                    return JSON.parse(JSON.stringify(result))[0].experienceID;
                }
            });
    });
};

exports.statusToStatusCode = async (status) => {
    getPool.getConnection((err, connection) => {
        connection.query(`SELECT statusCode
                          FROM statusTypes
                          WHERE statusCode = ${getPool.escape(status)};`,
            (err, result) => {
                if (err) {
                    connection.release();
                    throw err;
                } else {
                    connection.release();
                    return JSON.parse(JSON.stringify(result))[0].statusCode;
                }
            });
    });
};

exports.queueToQueueCode = async (queue) => {
    getPool.getConnection((connection) => {
        connection.query(`SELECT queueCode
                          FROM queueTypes
                          WHERE queueCode = ${getPool.escape(queue)};`,
            (err, result) => {
                if (err) {
                    connection.release();
                    throw err;
                } else {
                    connection.release();
                    return JSON.parse(JSON.stringify(result))[0].queueCode;
                }
            });
    });
};
