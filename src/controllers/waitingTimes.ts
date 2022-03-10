const getFromDB = require('../utilis/getFromDB');
const getFromAPI = require('../utilis/getFromAPI');
const sendToDB = require('../utilis/sendToDB');
/**
 * Function to get all waiting times and add them to the database
 * @returns Status code 200 if the waiting times were added successfully
 * @returns Status code 500 if there was an error
 */

exports.sendAllWaitingTimesToDB = async function (req: any, res) {
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
            for (let j = 0; j < waitingTimes.length - 1; j++) {
                if (waitingTimes[j].entityType === "ATTRACTION") {
                    if (waitingTimes[j].status != "CLOSED") {
                        await getFromDB.APIIDToExperienceID(res, waitingTimes[j].id, async next => {
                            await getFromDB.statusToStatusCode(res, waitingTimes[j].status, async next => {
                                if (waitingTimes[j].queue) {
                                    if (waitingTimes[j].queue.STANDBY) {
                                        await sendToDB.pushWaitingTime(waitingTimes, res, waitingTimes[j].queue.STANDBY.waitTime, 0, waitingTimes[j].lastUpdated, async next => {
                                                if (waitingTimes[j].queue.SINGLE_RIDER) {
                                                    await sendToDB.pushWaitingTime(waitingTimes, res, waitingTimes[j].queue.SINGLE_RIDER.waitTime, 1, waitingTimes[j].lastUpdated, next => {
                                                    });
                                                }
                                            }
                                        );
                                    }
                                }
                            });
                        });
                    }
                }
            }
        }
    }
    res.status(200).send();
}
