const baseHtml = require('./baseHtml');
const getNavBar = require('./getNavBar');

function template (content) {
    const nav = getNavBar();
    return baseHtml(nav + content);
}

module.exports = template;