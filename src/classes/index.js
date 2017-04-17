var fs = require('fs');
var classes = {};
fs.readdirSync(__dirname).filter(function (entry) {
    var ignored = ['index.js', '.DS_Store'];
    return (ignored.indexOf(entry) == -1);
}).forEach(function (entry) {
    classes[entry.split('.')[0]] = require('./'+entry);
});
module.exports = classes;