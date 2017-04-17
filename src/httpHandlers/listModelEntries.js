var classes = require('../classes');

module.exports = function (project) {
    return function (config, db) {
        return function (req, res, next) {
            var model = new classes.MongoModel(db, config.model);
            model.findAll().then(function (instances) {
                res.status(200);
                res.json(instances);
                res.end();
            });
        }
    }
}