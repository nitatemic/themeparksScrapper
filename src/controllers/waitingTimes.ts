const getFromDB = require('../utilis/getFromDB');


/**
 * Function to get all waiting times and add them to the database
 * @returns Status code 200 if the waiting times were added successfully
 * @returns Status code 500 if there was an error
 */

exports.sendAllWaitingTimesToDB = async (req, res): Promise<string> => {
    /* Récupérer la liste de tous les parcs compatibles avec l'API*/
    let destinationsList = await getFromDB.getAllParksID()
    console.log(destinationsList);
    return res.status(200).json(destinationsList);
}
