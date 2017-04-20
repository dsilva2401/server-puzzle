var classes = require('../classes');

module.exports = function (project) {
    return function (config, db) {
        return function (req, res, next) {
            var model = new classes.MongoModel(db, config.model);
            var criteria = {};
            req.query = req.query || {};
            Object.keys(req.query).forEach(function (key) {
                if (!project.db.mongo.models[config.model].schema.properties[key]) return;
                var kType = project.db.mongo.models[config.model].schema.properties[key].type;
                switch (kType) {
                    case 'string':
                        criteria['$and'] = criteria['$and'] || [];
                        criteria['$and'] = criteria['$and'].concat(
                            req.query[key].split(/\s+/g).map(function (q) {
                                var obj = {};
                                obj[key] = new RegExp(q, 'i');
                                return obj;
                            })
                        )
                    break;
                    case 'number':
                        criteria[key] = parseFloat(req.query[key]);
                    break;
                    default:
                    break;
                }
            });
            model.findAll(criteria, {
                page: parseInt(req.query['_page_']) || 0,
                limit: parseInt(req.query['_limit_']) || 20
            }).then(function (instances) {
                res.status(200);
                res.json(instances);
                res.end();
            });
        }
    }
}