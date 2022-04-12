/**
 * DailyApi.
 * Abridged api interface for Daily prebuilt.
 */
const rest = require('../library/rest')

module.exports = {
  
  /**
   *  checkConfig
   *
   *  does an api call with no args and checks domain is correct
   *
   * @return {bool} returns true if domain matches config
   */
  checkConfig: () => {
    var status = false;
    return rest.call({ path: "", method: "GET", data: "" }).then((results) => {
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
    return rest.call({ path: "/rooms", method: "GET", data: "" });
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
    return rest.call({ path: "/rooms", method: "POST", data: newroom }).then(
      (results) => {
        return results.name;
      }
    );
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
    return rest.call({ path: "/rooms/" + roomName, method: "DELETE", data: "" });
  },
};
