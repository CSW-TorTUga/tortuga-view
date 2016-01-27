(function() {

  angular.module('deviceReservations', [
    'ui.router'
  ]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('deviceReservations', {
      url: '/deviceReservations',
      templateUrl: 'src/deviceReservations/list.html',
      controller: 'DeviceListController',
      controllerAs: 'deviceListController'
    }).state('deviceReservationCreate', {
      url: '/deviceReservationCreate',
      templateUrl: 'src/deviceReservations/create.html',
      controller: 'DeviceReservationCreateController',
      controllerAs: 'createController'
    });
  }]);

})();
