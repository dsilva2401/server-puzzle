window.app.controller('searchController', function ($scope, resources) {
    $scope.models = {};
    $scope.methods = {};

    // Attributes
    $scope.models.rows = window.webappData.templateSettings.rows;
    $scope.models.search = window.webappData.templateSettings.search;
    $scope.models.preview = window.webappData.templateSettings.preview;
    $scope.models.page = 0;
    $scope.models.entries = [];
    $scope.models.searchModels = {};
    $scope.models.loadMore = true;
    $scope.models.currentItem = null;
    $scope.models.showFilters = false;

    // Methods
    $scope.methods.toggleFiltersPanel = function () {
        $scope.models.showFilters = !!!$scope.models.showFilters;
    }
    $scope.methods.setCurrentItem = function (item) {
        $scope.models.currentItem = item;
    }
    $scope.methods.loadEntries = function (incPage) {
        if (!incPage) {
            $scope.models.entries = [];
            $scope.models.page = 0;
            $scope.models.loadMore = true;
        } else {
            $scope.models.page++;
        }
        var router = webappData.templateSettings.resource[0];
        var route = webappData.templateSettings.resource[1];
        var limit = 15;
        resources[router][route]({
            query: $scope.models.searchModels
        }, {
            limit: limit,
            page: $scope.models.page
        }).then(function (entries) {
            if (!entries.length || entries.length<limit) $scope.models.loadMore = false;
            $scope.models.entries = $scope.models.entries.concat(entries);
        })
    }

    // Init
    $scope.methods.loadEntries();

})