(function() {

  angular.module('home', [
    'ui.router'
  ]).config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
      });
  }]);

})();
