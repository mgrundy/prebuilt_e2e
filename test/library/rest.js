/**
 * rest
 * provides call() function used by DailyApi
 */
const fetch = require("node-fetch");
const config = require("../config/config.json");

module.exports = {
  /**
   *  call
   *
   *  makes all REST calls to daily API
   *
   * @param {string}   args.path path for api call
   * @param {string}   args.method GET, POST, DELETE etc
   * @param {object}   args.data Object to use in request body
   *
   * @return {json} returns api json response
   */
  call: ({ path, method, data }) => {
    const ROOT_URI = `https://api.daily.co/v1/`;

    let requestData = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + config.apiKey,
      },
    };
    // Shouldn't have body data for GET or DELETE
    if (data) {
      requestData.body = JSON.stringify(data);
    }

    return fetch(`${ROOT_URI}${path}`, requestData).then((resp) => {
      if (resp.status !== 200) {
        throw new Error(
          `Invalid status code (!= 200) while retrieving ${path}: ${resp.status}`
        );
      }
      return resp.json();
    });
  },
};
