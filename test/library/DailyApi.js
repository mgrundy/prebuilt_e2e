/**
 * DailyApi.
 * Abridged api interface for Daily prebuilt.
 */
const rest = require("../library/rest");

module.exports = {
  /**
   *  checkConfig
   *
   *  does an api makeRequest with no args and checks domain is correct
   *
   * @return {bool} returns true if domain matches config
   */
  checkConfig: () => {
    return rest.makeRequest({ path: "", method: "GET", data: "" }).then((results) => {
      return results.domain_name == config.domainName;
    });
  },

  /**
   *  getRoomList
   *
   *  gets a list of all the configured rooms
   *
   * @return {array} returns array of room objects
   */
  getRoomList: () => {
    return rest.makeRequest({ path: "rooms", method: "GET", data: "" });
  },

  /**
   *  createRoom
   *
   *  creates a room with specified config object
   *
   * @param {obj} room configuration object (see VideoCall.js)
   *
   * @return {string} returns name of created room
   */
  createRoom: (newroom) => {
    return rest
      .makeRequest({ path: "rooms", method: "POST", data: newroom })
      .then((results) => {
        return results.name;
      });
  },

  /**
   *  deleteRoom
   *
   *  deletes the specified room
   *
   * @param {string} room name
   *
   * @return {object} returns delete confirmation object
   */
  deleteRoom: (roomName) => {
    return rest.makeRequest({ path: "rooms/" + roomName, method: "DELETE", data: "" });
  },

  /**
   *  getToken
   *
   *  gets an auth token for the specified room
   *
   * @param {string} room name
   *
   * @return {object} returns delete confirmation object
   */
  getToken: (userData) => {
    return rest.makeRequest({
      path: "meeting-tokens",
      method: "POST",
      data: userData,
    });
  },
};
