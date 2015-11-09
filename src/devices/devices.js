(function() {

  angular.module('devices', [
    'ui.router'
  ]).config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('devices', {
        url: '/devices',
        templateUrl: 'templates/devices/devices.html'
      });
  }]);

})();
