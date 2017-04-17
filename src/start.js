var project = require('../project.json');
var services = require('./services')(project);

// Connect to database
services.connectMongoDB().then(function (db) {

    // Start http server
    services.startHTTPServer().then(function (server) {

        // Setup statics
        services.setupServerStatics(server.app);

        // Setup routes
        services.setupServerRoutes(server.app, db);

    });

}).catch(function (err) {
    services.logger(err);
});