const Page = require('./page');

/**
 * page containing selectors for conference room interface 
 */
class ConferenceRoom extends Page {
    /**
     * define selectors using getter methods
     */
    get inputAttendeeName () {
        return $('#username') 
    }

    get btnContinue() {
        return $('.robots-btn-continue') 
    }

    get btnJoin() {
        return $('.robots-btn-join') 
    }

    get btnLeave() {
        return $('.robots-btn-leave')
    }

    get btnMute() {
        return $('.robots-btn-mic-mute')
    }

    get btnUnMute() {
        return $('.robots-btn-mic-unmute')
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to join public room with an attendee name
     */
    async join (attendeename) {
        await this.inputAttendeeName.setValue(attendeename);
        await this.btnContinue.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open (meetingName) {
        return super.open(meetingName);
    }
}

module.exports = new ConferenceRoom();
