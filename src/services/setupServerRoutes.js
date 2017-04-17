var project = require('../../project.json');
var express = require('express');
var handlers = require('../httpHandlers')(project);

module.exports = function (project) {
    return function (expressApp) {

        // Setting up routers
        project.httpAPI.routers.forEach(function (routerData) {
            var router = express.Router();

            // Setting up routes
            routerData.routes.forEach(function (routeData) {

                // Setting up handlers
                routeData.handlersPipeline.forEach(function (handlerData) {
                    if (!handlers[handlerData.handler]) return;
                    router[routeData.method.toLowerCase()](
                        routeData.path,
                        handlers[handlerData.handler]()
                    )
                })

            });

            expressApp.use(routerData.path, router);
        });

    }
}