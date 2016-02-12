(function() {

    angular.module('login', [
        'ui.router',
        'ngCookies'
    ]).config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('login', {
            url: '/login?t',
            templateUrl: 'src/login/login.html'
        });

        $stateProvider.state('doorSuccess', {
            url: '/doorSuccess',
            template: [
                '<div flex layout-align="center center" layout="column">',
                '<img src="/terminal/lock.svg" style="width: 40%">',
                '</div>'
            ].join('')
        })
    }]);



})();
