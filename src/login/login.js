(function() {

    angular.module('login', [
        'ui.router',
        'ngCookies'
    ]).config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'src/login/login.html'
        });
    }]);



})();
