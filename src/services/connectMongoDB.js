var mongodb = require('mongodb');
var Q = require('q');

module.exports = function (project) {
    return function () {
        var deferred = Q.defer();
		mongodb.MongoClient.connect(project.db.mongo.config.url, function (err, dbInstance) {
			if (err) {
				deferred.reject(err);
				return;
			}
            deferred.resolve(dbInstance);
			/*var m = new MongoModel('test');
			m.getResponseTime().then(function () {
				deferred.resolve();
			}).catch(deferred.reject);*/
		});
		return deferred.promise;
    }
}