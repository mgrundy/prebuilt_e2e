/**
 *  Main Page object that other pages will inherit.
 *
 *  Probably won't require much other than putting together the page url
 *
 */


const config = require('../config/config.json')
module.exports = class Page {
    /**
    * Opens a page for test driver class
    * @param {string} path path of the sub page (e.g. /path/to/page.html)
    */
    open (path) {
        return browser.url(`https://${config.domainName}.daily.co/${path}`)
    }
}
