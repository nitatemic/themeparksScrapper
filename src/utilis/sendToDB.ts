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

exports.pushWaitingTime = async (statusCode, experiencesID, wait, queueCode, lastUpdated) => {
    postPool.getConnection((err, connection) => {
        if (err) {
            throw err;
        }
        try {
            connection.query(`INSERT INTO \`waitingTimes\` (\`experienceID\`, \`statusCode\`,
                                                            \`waitingTime\`, \`queueCode\`,
                                                            \`time\`)
                              VALUES ('${postPool.escape(experiencesID)}',
                                      '${postPool.escape(statusCode)}',
                                      '${postPool.escape(wait)}', '${queueCode}',
                                      ${postPool.escape(lastUpdated)});`,
                (err, result) => {
                    if (err) {
                        console.log(err);
                        connection.release();
                    } else {
                        console.log(`Pushed to database`);
                        connection.release();
                        return;
                    }
                });
        } catch (err) {
            console.log(err);
            connection.release();
        }
    })
};
