(function() {

  angular.module('deviceReservations', [
    'ui.router'
  ]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('deviceReservationCreate', {
      url: '/devicereservations/new',
      templateUrl: 'src/deviceReservations/create.html',
      controller: 'DeviceReservationCreateController',
      controllerAs: 'createController'
    }).state('deviceReservationList', {
      url: '/devicereservations/list',
      templateUrl: 'src/deviceReservations/list.html',
      controller: 'DeviceReservationListController',
      controllerAs: 'deviceListController'
    });
  }]);

})();
