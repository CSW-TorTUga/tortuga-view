(function () {

    var PRIMARY = 'blue-grey';
    var ACCENT = 'orange';

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    angular.module('rms', [
        'ngMaterial',
        'ui.router',
        'ngRoute',
        'home',
        'management',
        'errorToast',
        'bookings'
    ]).config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function ($mdThemingProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette(PRIMARY)
            .accentPalette(ACCENT, {
                default: 'A100'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $stateProvider.state('profile', {
            url: '/profile',
            templateUrl: 'src/profile/profile.html'
        }).state('login', {
            url: '/login',
            templateUrl: 'src/login/login.html'
        });

        $urlRouterProvider.otherwise('/home');

    }]).run(['$rootScope', '$mdColorPalette', function ($rootScope, $mdColorPalette) {
        var primaryPalette = $mdColorPalette[PRIMARY];

        $rootScope.primaryColor = rgbToHex(
            primaryPalette['500'].value[0],
            primaryPalette['500'].value[1],
            primaryPalette['500'].value[2]);

        var accentPalette = $mdColorPalette[ACCENT];

        $rootScope.accentColor = rgbToHex(
            accentPalette['A100'].value[0],
            accentPalette['A100'].value[1],
            accentPalette['A100'].value[2]);
    }]);

})();
