const baseHtml = require('./baseHtml');
const getNavBar = require('./getNavBar');
/* const dashboard = require('./dashboardHtml'); */

function template (content) {
    const nav = getNavBar();
    return baseHtml (`
        ${nav}
        <div class="container">
         ${content}
        <div>
        `);
}

module.exports = template;