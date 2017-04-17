var fs = require('fs');

module.exports = function (project) {
    var httpHandlers = {};
    fs.readdirSync(__dirname).filter(function (entry) {
        var ignored = ['index.js', '.DS_Store'];
        return (ignored.indexOf(entry) == -1);
    }).forEach(function (entry) {
        httpHandlers[entry.split('.')[0]] = require('./'+entry)(project);
    });
    return httpHandlers;
}