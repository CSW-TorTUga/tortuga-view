(function() {

  angular.module('bookings', [
    'ui.router'
  ]).config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('bookings', {
      url: '/bookings',
      templateUrl: 'src/bookings/bookings.html'
    });
  }]);

})();
