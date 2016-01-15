(function() {

    angular.module('room', [
        'ui.router'
    ]).config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('room', {
            url: '/room',
            templateUrl: 'src/room/list.html',
            controllerAs: 'roomController',
            controller: 'RoomListController'
        });
    }]);

})();