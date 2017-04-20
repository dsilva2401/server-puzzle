window.app.factory('resources', function ($http, $q) {
    var resources = {};
    Object.keys(window.httpAPI.routers).forEach(function (routerKey) {
        var routerData = window.httpAPI.routers[routerKey];
        Object.keys(routerData.routes).forEach(function (routeKey) {
            var routeData = routerData.routes[routeKey];
            resources[routerKey] = {};
            resources[routerKey][routeKey] = function (params, options) {
                params = params || {};
                options = options || {};
                var url = (function () {
                    var u = routerData.path+routeData.path; 
                    // Setup query
                    if (options.limit) {
                        params.query['_limit_'] = options.limit;
                    }
                    if (typeof options.page != 'undefined') {
                        params.query['_page_'] = options.page;
                    }
                    if (params.query && Object.keys(params.query).length) {
                        u += '?'+Object.keys(params.query).map(function (k) {
                            return k+'='+params.query[k];
                        }).join('&');
                    }
                    return u;
                })()
                var deferred = $q.defer();
                $http({
                    method: routeData.method,
                    url: url
                }).then(function (resp) {
                    deferred.resolve(resp.data);
                }, function (resp) {
                    deferred.reject(resp);
                });
                return deferred.promise;
            };
        });
    })
    return resources;
})