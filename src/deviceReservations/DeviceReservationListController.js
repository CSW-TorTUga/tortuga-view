/**
 * Created by Schir on 13.01.2016.
 */

(function() {
    angular.module('deviceReservations')
        .controller('DeviceReservationListController', [
            'DeviceReservation',
            '$mdDialog',
            'AuthenticationService',
            DeviceReservationListController
        ]);


    function DeviceReservationListController(DeviceReservation, $mdDialog, AuthenticationService){
        var self = this;

        self.reservations = DeviceReservation.query({
            "timeSpan.end": ">" + (new Date()).valueOf(),
            "user": AuthenticationService.getUser().id
        });


        self.deviceReservationDeleted = deviceReservationDeleted;

        //public
        function deviceReservationDeleted(reservation){
            self.reservations.splice(self.reservations.indexOf(reservation), 1);
        }
    }

})();