var Q = require('q');

module.exports = function MongoModel (db, name) {
    
    // Attributes
    var slf = this;
    this.collection = db.collection(name);
    this.name = name;

    // Methods
    this.getResponseTime = function () {
        var deferred = Q.defer();
        var start = Date.now();
        slf.collection.findOne({}, function (err, resp) {
            if (err) {
                deferred.reject(err);
                return;
            }
            deferred.resolve(Date.now()-start);
        });
        return deferred.promise;
    }
    this.createIndex = function (fields, options) {
        slf.collection.createIndex(fields, options);
    }
    this.findAll = function (criteria, options) {
        var deferred = Q.defer();
        var cursor = slf.collection.find(criteria);
        if (options) {
            if (options.page) cursor = cursor.skip(options.page*options.limit);
            if (options.limit) cursor = cursor.limit(options.limit);
            if (options.sort) cursor = cursor.sort(options.sort);
        } 
        cursor.toArray(function (err, resp) {
            if (err) {
                deferred.reject(err);
                return;
            }
            resp.map(function (record) {
                record._id = record._id.toString();
                record.id = record._id;
                return record;
            });
            deferred.resolve(resp);
        });
        return deferred.promise;
    }

}
