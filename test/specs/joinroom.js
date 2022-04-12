import { setupBrowser } from "@testing-library/webdriverio";
// import {screen} from '@testing-library/dom'
// import {Element, BrowserObject, MultiRemoteBrowserObject} from 'webdriverio'

// const ConferenceRoom = require('../pageobjects/conferenceroom.page');
import ConferenceRoom from "../pageobjects/conferenceroom.page";
import Meeting from "../library/Meeting";

describe("Happy path video conference", () => {
  let meeting = null;
  
  before(async () => {
    meeting = new Meeting(false);
    await meeting.cleanup();
    await meeting.getARoom()
    setupBrowser(browser);
  });

  after(async () => {
    await meeting.delete();
  })

  it("should join and leave public room", async () => {
    await ConferenceRoom.open(meeting.getName());
    await ConferenceRoom.join("Ferb Fletcher");
    await expect(ConferenceRoom.btnJoin).toBeExisting();

    // Join the meeting
    await ConferenceRoom.btnJoin.click();
    await expect(ConferenceRoom.btnLeave).toBeExisting();
    // Get out.
    await expect(ConferenceRoom.btnUnMute).toBeExisting();
    await ConferenceRoom.btnLeave.click();
  });
});