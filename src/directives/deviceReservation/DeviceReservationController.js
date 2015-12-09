(function() {

    angular.module('rms')
        .controller('DeviceReservationController', DeviceReservationController);

    function DeviceReservationController() {
        var self = this;

        function borrow(device) {
            alert(device.name + ' ausgeliehent');
        }

        function isActive(reservation) {
            var now = (new Date()).getTime();

            return now >= reservation.timestamp.beginning && now <= reservation.timestamp.end;
        }
    }

})();