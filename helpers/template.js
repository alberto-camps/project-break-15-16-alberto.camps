const baseHtml = require('./baseHtml');
const getNavBar = require('./getNavBar');
/* const dashboard = require('./dashboardHtml'); */

function template (content) {
    const nav = getNavBar();
    return baseHtml(nav + content);
}

module.exports = template;