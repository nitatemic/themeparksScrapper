/*
 * Fichier qui contient toutes les fonctions de mise à jour de la base de données
 */

require('dotenv').config();

// @ts-ignore
const mysql = require('mysql');

const postPool = mysql.createPool({
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
 * Function to send a waiting time to the database
 * @param {array} waitingTime - The waiting time to send
 */

exports.pushWaitingTime = async (waitingTime, res, wait, queueCode, lastUpdated, next) => {
    postPool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        try {
            connection.query(`INSERT INTO \`waitingTimes\` (\`experienceID\`, \`statusCode\`,
                                                            \`waitingTime\`, \`queueCode\`,
                                                            \`time\`)
                              VALUES ('${postPool.escape(res.locals.experiencesID)}',
                                      '${postPool.escape(res.locals.statusCode)}',
                                      '${postPool.escape(wait)}', '${queueCode}',
                                      ${postPool.escape(lastUpdated)});`,
                (err, result) => {
                    if (err) {
                        res.status = 500;
                        console.log(err);
                        connection.release();
                    } else {
                        console.log('Waiting time pushed to database');
                        connection.release();
                        next()
                    }
                });
        } catch (err) {
            console.log(err);
            connection.release();
        }
    })
};
