/*
 * Fichier qui contient toutes les fonctions de récupération de données de la base de données
 */

require('dotenv').config();

// @ts-ignore
const mysql = require('mysql');

// @ts-ignore
const getPool = mysql.createPool({
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
                reject(err);
            } else {
                connection.query('SELECT APIID FROM parks', (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            }
        });
    });
};

exports.APIIDToExperienceID = async (res, APIID, next) => {
    getPool.getConnection((err, connection) => {
        connection.query(`SELECT experienceID
                          FROM experiences
                          WHERE APIID = ${getPool.escape(APIID)};`,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    connection.release();
                    res.locals.experiencesID = JSON.parse(JSON.stringify(result))[0].experienceID;
                    next();
                }
            });
    });
};

exports.statusToStatusCode = async (res, status, next) => {
    getPool.getConnection((err, connection) => {
        connection.query(`SELECT statusCode
                          FROM statusTypes
                          WHERE statusCode = ${getPool.escape(status)};`,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    connection.release();
                    res.locals.statusCode = JSON.parse(JSON.stringify(result))[0].statusCode;
                    next();
                }
            });
    });
};
