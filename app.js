(function() {

  var PRIMARY = 'blue-grey';
  var ACCENT = 'deep-orange';

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  angular.module('rms', [
    'ngMaterial',
    'ui.router',
    'ngRoute',
    'home',
    'management',
    'devices'
  ]).config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', function($mdThemingProvider, $stateProvider, $urlRouterProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette(PRIMARY)
        .accentPalette(ACCENT, {
          default: 'A100'
        });

      $stateProvider.state('booking', {
          url: '/booking',
          templateUrl: 'templates/booking.html'
        });

      $urlRouterProvider.otherwise('/home');

  }]).run(['$rootScope', '$mdColorPalette', function($rootScope, $mdColorPalette) {
      var primaryPalette = $mdColorPalette[PRIMARY];

      var primaryColor = rgbToHex(
        primaryPalette['500'].value[0],
        primaryPalette['500'].value[1],
        primaryPalette['500'].value[2]);

      $rootScope.primaryColor = primaryColor;

      var accentPalette = $mdColorPalette[ACCENT];

      var accentColor = rgbToHex(
        accentPalette['A100'].value[0],
        accentPalette['A100'].value[1],
        accentPalette['A100'].value[2]);

      $rootScope.accentColor = accentColor;
    }]);

})();
