/**
 *  Main Page object that other pages will inherit.
 *
 *  Probably won't require much other than putting together the page url
 *
 */

const config = require("../config/config.json");
module.exports = class Page {
  /**
   * Opens a page for test driver class
   * @param {string} path path of the sub page (e.g. /path/to/page.html)
   * @param {string} token optional authorization token for meeting
   */
  open(path, token) {
    let meetingUrl = new URL(`https://${config.domainName}.daily.co/${path}`);
    if (token) {
      meetingUrl.searchParams.set("t", token);
    }
    return browser.url(meetingUrl.toString());
  }
};
