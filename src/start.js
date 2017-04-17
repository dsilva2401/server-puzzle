var project = require('../project.json');
var services = require('./services')(project);

// Connect to database
services.connectMongoDB().then(function () {

    // Start http server
    services.startHTTPServer().then(function (instance) {

        // Setup routes
        services.setupServerRoutes(instance.app);

    });

}).catch(function (err) {
    services.logger(err);
});