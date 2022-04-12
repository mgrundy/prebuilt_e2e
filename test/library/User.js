/**
 * User.
 *
 * Used by Meeting class
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
//  }
  //   {

  //   {
  //       "properties": {
  //         "room_name": "getting-started-webinar",
  //         "user_name": "Grumplestilskin"
  //       }
  //     }