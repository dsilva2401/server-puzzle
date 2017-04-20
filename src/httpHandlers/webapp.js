var pug = require('pug');
var path = require('path');

module.exports = function (project) {
    return function (config, db) {
        return function (req, res, next) {
            var webappData = project.webapps[config.webapp];
            var templateFile = path.join(
                __dirname,
                '../templates/'+webappData.template+'/index.pug'
            );
            var webappDataString = JSON.stringify(webappData);
            var httpAPIString = JSON.stringify(project.httpAPI);
            res.send(pug.compileFile(templateFile)({
                webappData: webappDataString,
                httpAPI: httpAPIString
            }))
            res.end();
        }
    }
}