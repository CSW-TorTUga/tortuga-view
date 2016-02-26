(function() {

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
        'deviceReservations',
        'ngResource',
        'login',
        'room',
        'tickets',
        'supportTicket',
        'profile',
        'calendar',
        'ngSweets',
        'newPin',
        'import',
        'ngMessages'
    ]).config([
        '$mdThemingProvider',
        '$urlRouterProvider',
        '$locationProvider',
        '$httpProvider',
        rmsConfig
    ]).run([
        '$rootScope',
        '$mdColorPalette',
        '$state',
        rmsRun
    ]);

    function rmsConfig($mdThemingProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette(PRIMARY, {
                'default' : '500'
            })
            .accentPalette(ACCENT, {
                default: 'A100'
            });

        $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise('/home');

        $httpProvider.interceptors.push('unauthorizedInterceptor');
        $httpProvider.interceptors.push('connectionTimeoutInterceptor');
        $httpProvider.interceptors.push('loadingStateInterceptor');
        $httpProvider.interceptors.push('errorInterceptor');
    }

    function rmsRun($rootScope, $mdColorPalette, $state) {
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

        $rootScope.$on('$stateChangeStart', function onStateChange(evt, to) {
            if(to.redirectTo) {
                evt.preventDefault();
                $state.go(to.redirectTo);
            }
        });
    }

})
();
