(function() {

  angular.module('deviceReservations', [
    'ui.router'
  ]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('deviceReservations', {
      url: '/deviceReservations',
      templateUrl: 'src/deviceReservations/list.html',
      controller: 'DeviceReservationListController',
      controllerAs: 'deviceListController'
    });
  }]);

})();
