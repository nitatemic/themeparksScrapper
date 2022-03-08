const getFromDB = require('../utilis/getFromDB');
const getFromAPI = require('../utilis/getFromAPI');
/**
 * Function to get all waiting times and add them to the database
 * @returns Status code 200 if the waiting times were added successfully
 * @returns Status code 500 if there was an error
 */

exports.sendAllWaitingTimesToDB = async (req, res): Promise<string> => {
    /* Récupérer la liste de tous les parcs compatibles avec l'API*/
    let parksList = await getFromDB.getAllParksID()
    //Convert rowDataPacket array to array
    parksList = JSON.stringify(parksList);
    parksList = JSON.parse(parksList) /* Yes I know this is a bad way to do it, but I don't care */
    //For each park in the list
    for (let i = 0; i < parksList.length; i++) {
        //Get the waiting times for the park
        let waitingTimes = await getFromAPI.getWaitingTimesFromAPI(parksList[i].APIID);
        //If the waiting times are not null, loop through them and add them to the database
        if (waitingTimes.length > 0) {
            for (let j = 0; j < waitingTimes.length; j++) {
                await sendToDB.pushWaitingTimeToDB(waitingTimes[j].id, waitingTimes[j].parkName, waitingTimes[j].parkURL, waitingTimes[j].parkAddress, waitingTimes[j].parkCity, waitingTimes[j].parkState, waitingTimes[j].parkZip, waitingTimes[j].parkPhone, waitingTimes[j].parkLat, waitingTimes[j].parkLng, waitingTimes[j].parkWaitTime, waitingTimes[j].parkWaitTimeDate);
            }
        }
        //Else, do nothing


    }
    return res.status(200).json(parksList);
}
