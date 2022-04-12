import { setupBrowser } from "@testing-library/webdriverio";
// import {screen} from '@testing-library/dom'
// import {Element, BrowserObject, MultiRemoteBrowserObject} from 'webdriverio'

// const MeetingRoom = require('../pageobjects/MeetingRoom.page');
import MeetingRoom from "../pageobjects/meetingroom";
import Meeting from "../library/Meeting";

describe("Happy path video call", () => {
  let meeting = null;
  
  before(async () => {
    meeting = new Meeting(false);
    await meeting.getARoom()
    setupBrowser(browser);
  });

  after(async () => {
    await meeting.delete();
  })

  it("should join and leave public room", async () => {
    await MeetingRoom.open(meeting.getName());
    await MeetingRoom.join("Ferb Fletcher");
    await expect(MeetingRoom.btnJoin).toBeExisting();

    // Join the meeting
    await MeetingRoom.btnJoin.click();
    await expect(MeetingRoom.btnUnMute).toBeExisting();
    await expect(MeetingRoom.btnLeave).toBeExisting();
    
    // Get out.
    await MeetingRoom.btnLeave.click();
  });
});