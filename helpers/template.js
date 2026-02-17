const baseHtml = require('./baseHtml');
const getNavBar = require('./getNavBar');
/* const dashboard = require('./dashboardHtml'); */

function template (content, req) {
    const nav = getNavBar(req);
    return baseHtml (`
        ${nav}
        <div class="container">
         ${content}
        <div>
        `);
}

module.exports = template;