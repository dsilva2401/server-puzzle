var Q = require('q');
var express = require('express');
var http = require('http');

module.exports = function (project) {
    return function () {
        var deferred = Q.defer();
        var app = express();
        var httpServer = http.createServer(app);
        httpServer.listen(project.httpAPI.config.port, function () {
			deferred.resolve({
                httpServer: httpServer,
                app: app
            });
		});
        return deferred.promise;
    }
}