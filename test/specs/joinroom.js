import { setupBrowser } from '@testing-library/webdriverio'
// import {screen} from '@testing-library/dom'
// import {Element, BrowserObject, MultiRemoteBrowserObject} from 'webdriverio' 

const JoinPage = require('../pageobjects/joinroom.page');

describe('My conference application', () => {
    before(async () => {
      setupBrowser(browser)
    })

    it('should join and leave public room', async () => {
        await JoinPage.open();
        await JoinPage.join("Ferb Fletcher")
        await expect(JoinPage.btnJoin).toBeExisting()

        // Join the meeting
        await JoinPage.btnJoin.click()
        await expect(JoinPage.btnLeave).toBeExisting()
        // Get out.
        await expect(JoinPage.btnUnMute).toBeExisting()
        await JoinPage.btnLeave.click()
    });
});


