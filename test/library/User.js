/**
 * User functions.
 *
 * Will become object that is stored in Meeting class. Just a helper function for
 * getting a meeting owner token.
 *
 */

import dailyApi from "./DailyApi";
module.exports = {
  createOwner: (roomName) => {
    let userProperties = {
      properties: {
        room_name: "getting-started-webinar",
        is_owner: true,
        start_cloud_recording: true,
        user_name: "Instructor",
      },
    };
    userProperties.properties.room_name = roomName;
    return dailyApi.getToken(userProperties)
  }
};
