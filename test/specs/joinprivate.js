import { setupBrowser } from "@testing-library/webdriverio";

import MeetingRoom from "../pageobjects/meetingroom";
import Meeting from "../library/Meeting";
import User from "../library/User";

describe("Leader joining meeting with token", () => {
  let meeting = null;
  let token = null
  
  before(async () => {
    meeting = new Meeting();
    await meeting.getARoom();
    // private meeting so get token
    let response = await User.createOwner(meeting.getName())
    token = response.token
    setupBrowser(browser);
  });

  after(async () => {
    await meeting.delete();
  })

  it("should join and leave public room", async () => {
    // Remove the token parameter to force a failure (see next line)
    // await MeetingRoom.open(meeting.getName());
    await MeetingRoom.open(meeting.getName(), token);

    // Join the meeting
    // Since we opened the URL with a token we don't have
    // to put in a user name
    await MeetingRoom.btnJoin.click();
    await expect(MeetingRoom.btnUnMute).toBeExisting();
    await expect(MeetingRoom.btnLeave).toBeExisting();
    
    // Get out.
    await MeetingRoom.btnLeave.click();
  });
});