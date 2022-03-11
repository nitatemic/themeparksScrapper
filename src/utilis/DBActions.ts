/*
 * Fichier qui contient toutes les fonctions de récupération de données de la base de données
 */

require('dotenv').config();

// @ts-ignore
const mysql = require('mysql');

// @ts-ignore
const Pool = mysql.createPool({
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
        Pool.getConnection((err, connection) => {
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
    Pool.getConnection((err, connection) => {
        connection.query(`SELECT experienceID
                          FROM experiences
                          WHERE APIID = ${Pool.escape(APIID)};`,
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
    Pool.getConnection((err, connection) => {
        connection.query(`SELECT statusCode
                          FROM statusTypes
                          WHERE statusCode = ${Pool.escape(status)};`,
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
    Pool.getConnection((connection) => {
        connection.query(`SELECT queueCode
                          FROM queueTypes
                          WHERE queueCode = ${Pool.escape(queue)};`,
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

exports.pushWaitingTime = async (waitingTimes, wait, queueCode) => {
    var experienceID: number;
    var statusCode: number;
    Pool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }

        try {
            connection.query(`SELECT experienceID
                              FROM experiences
                              WHERE APIID = ${Pool.escape(waitingTimes.id)};`,
                (err, result) => {
                    if (err) {
                        connection.release();
                        throw err;
                    } else {
                        experienceID = JSON.parse(JSON.stringify(result))[0].experienceID;
                        connection.query(`SELECT statusCode
                                          FROM statusTypes
                                          WHERE statusCode = ${Pool.escape(waitingTimes.status)};`,
                            (err, result) => {
                                if (err) {
                                    connection.release();
                                    throw err;
                                } else {
                                    statusCode = JSON.parse(JSON.stringify(result))[0].statusCode;
                                    console.log(experienceID)
                                    connection.query(`INSERT INTO \`waitingTimes\` (\`experienceID\`,
                                                                                    \`statusCode\`,
                                                                                    \`waitingTime\`,
                                                                                    \`queueCode\`,
                                                                                    \`time\`)
                                                      VALUES ('${experienceID}',
                                                              '${Pool.escape(statusCode)}',
                                                              '${Pool.escape(wait)}', '${queueCode}
                                                              ',
                                                              ${Pool.escape(waitingTimes.lastUpdated)});`,
                                        (err, result) => {
                                            if (err) {
                                                console.log(err);
                                                connection.release();
                                            } else {
                                                console.log(`Pushed to database`);
                                                connection.release();
                                                return;
                                            }
                                        })
                                }
                            });
                    }
                });
        } catch (err) {
            console.log(err);
            connection.release();
        }
    })
};
