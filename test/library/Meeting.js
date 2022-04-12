/**
 * Meeting
 * Object that represents meeting / room objects on Daily
 *
 *
 * @param {bool}   private      Privacy of room, default to true
 * @param {string} name         Optional name of room, default is generated
 *
 */

import dailyApi from "./DailyApi";

module.exports = class Meeting {
  constructor(privacy = true, name = "") {
    this.roomName = name;
    if (arguments.name) {
      this.roomName = arguments.name;
    }
    this.newroom = {
      properties: {
        enable_chat: true,
        owner_only_broadcast: false,
        start_video_off: true,
        start_audio_off: true,
      },
    };

    this.newroom.privacy = arguments.privacy ? "private" : "public";

    if (name) {
      this.newroom.name = name;
    }
  }

  getARoom() {
    return dailyApi.createRoom(this.newroom).then((roomName) => {
      this.roomName = roomName;
    });
  }

  getName() {
    return this.roomName;
  }

  setName(respName) {
    this.roomName = respName;
  }

  /**
   * Deletes the room
   */
  delete() {
    if (!this.roomName) {
      return;
    }
    console.log("Deleting " + this.roomName)
    return dailyApi.deleteRoom(this.roomName);
  }

  cleanup() {
    var grl = dailyApi.getRoomList();
    Promise.resolve(grl).then((rooms) => {
      console.dir(rooms.count);
      rooms.data.forEach((room) => {
        console.log("Deleting ->" + room.name);
        Promise.resolve(dailyApi.deleteRoom(room.name)).then((resp) =>
          console.dir(resp)
        );
      });
    });
  }
};
