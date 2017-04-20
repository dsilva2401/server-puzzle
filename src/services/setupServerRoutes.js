var project = require('../../project.json');
var express = require('express');
var handlers = require('../httpHandlers')(project);

module.exports = function (project) {
    return function (expressApp, db) {

        // Setting up routers
        Object.keys(project.httpAPI.routers).forEach(function (routerKey) {
            var routerData = project.httpAPI.routers[routerKey];
            var router = express.Router();

            // Setting up routes
            Object.keys(routerData.routes).forEach(function (routeKey) {
                var routeData = routerData.routes[routeKey];

                // Setting up handlers
                routeData.handlersPipeline.forEach(function (handlerData) {
                    if (!handlers[handlerData.handler]) return;
                    router[routeData.method.toLowerCase()](
                        routeData.path,
                        handlers[handlerData.handler](
                            handlerData.config || {},
                            db
                        )
                    )
                })

            });

            expressApp.use(routerData.path, router);
        });

    }
}