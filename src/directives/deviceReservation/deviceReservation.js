(function() {

    angular.module('rms')
        .directive('deviceReservation', deviceReservationDirective);

    function deviceReservationDirective() {
        return {
            restrict: 'E',
            templateUrl: '',
            scope: {
                reservation: '=',
                onDelete: '@'
            },
            controller: 'DeviceReservationController',
            controllerAs: 'deviceReservation'
        };
    }

})();