const fetch = require("node-fetch");
const config = require("../config/config.json");

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
const call = ({ path, method, data }) => {
  const ROOT_URI = `https://api.daily.co/v1/`;

  fetchConfig = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + config.apiKey,
    },
  };
  // Shouldn't have body data for GET or DELETE
  if (data) {
    fetchConfig.body = JSON.stringify(data);
  }
  return fetch(`${ROOT_URI}${path}`, fetchConfig).then((resp) => {
    if (resp.status !== 200) {
      console.log(path, resp);
      // throw new Error(`Invalid status code (!= 200) while retrieving ${path}: ${resp.status}`)
      console.log(
        `Invalid status code (!= 200) while retrieving ${path}: ${resp.status}`
      );
    }
    return resp.json();
  });
};

/**
 *  checkConfig
 *
 *  does an api call with no args and checks domain is correct
 * 
 * @return {bool} returns true if domain matches config
 */
const checkConfig = () => {
  var status = false;
  return call({ path: "", method: "GET", data: "" }).then((results) => {
    return results.domain_name == config.domainName;
  });
};

/**
 *  getRoomList
 *
 *  gets a list of all the configured rooms
 * 
 * @return {array} returns array of room objects
 */
const getRoomList = () => {
  return call({ path: "/rooms", method: "GET", data: "" });
};

/**
 *  createRoom
 *
 *  creates a room with specified config object
 * 
 * @param {obj} room configuration object (see VideoCall.js)
 * 
 * @return {string} returns name of created room 
 */
const createRoom = (newroom) => {
  return call({ path: "/rooms", method: "POST", data: newroom }).then(
    (results) => {
      return results.name;
    }
  );
};

/**
 *  deleteRoom
 *
 *  deletes the specified room
 * 
 * @param {string} room name
 * 
 * @return {object} returns delete confirmation object
 */
const deleteRoom = (roomName) => {
  return call({ path: "/rooms/" + roomName, method: "DELETE", data: "" });
};

