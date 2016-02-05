(function() {

    angular.module('newPin', [
        'ui.router'
    ]).config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('newPin', {
            url: '/newPin/:userId/:goWhenFinished',
            templateUrl: 'src/newPin/newPin.html',
            controller: 'NewPinController',
            controllerAs: 'pinController'
        });
    }]);

})();