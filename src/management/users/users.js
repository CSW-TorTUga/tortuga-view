(function() {

  angular.module('management.users', [
    'ui.router'
  ]).config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('management.users', {
        url: '/users',
        templateUrl: 'templates/management/users.html'
      });
  }]);

})();
