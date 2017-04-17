var project = require('../../project.json');
var express = require('express');
var path = require('path');

module.exports = function (project) {
    return function (expressApp) {
        expressApp.use(
            '/templates',
            express.static(path.join(__dirname, '../templates'))
        );
    }
}