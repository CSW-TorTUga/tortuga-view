(function() {

  angular.module('management', [
    'ui.router',
    'management.users'
  ]).config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('management', {
        url: '/management',
        templateUrl: 'templates/management/management.html'
      });
  }]);

})();
