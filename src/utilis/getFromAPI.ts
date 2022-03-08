const axios = require('axios');

/*
 * @desc Get waiting times for a park from API
 * @param {string} parkID - APIID of the park
 * @returns {array} - Array of waiting times
 * @throws {Error} - If API returns an error
 */

exports.getWaitingTimesFromAPI = async (parkID: string) => {
    try {
        const response = await axios.get(
            `https://api.themeparks.wiki/v1/entity/${parkID}/live`
        );
        let res = JSON.parse((JSON.stringify(response.data)));
        return res.liveData;

    } catch (error) {
        throw new Error(error);
    }
};
