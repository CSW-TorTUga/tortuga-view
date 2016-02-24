(function() {

    angular.module('management', [
        'ui.router',
        'management.users',
        'management.device'
    ]).config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('management', {
                url: '/management',
                templateUrl: 'src/management/management.html',
                redirectTo: 'management.users',
                data: {
                    viewName: 'Verwaltung'
                }
            });
    }]);

})();
