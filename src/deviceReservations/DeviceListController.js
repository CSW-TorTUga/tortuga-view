/**
 * Created by Schir on 13.01.2016.
 */

(function() {
    angular.module('deviceReservations')
        .controller('DeviceListController', [
            'DeviceReservation',
            '$mdDialog',
            'AuthenticationService',
            DeviceListController
        ]);


    function DeviceListController(DeviceReservation, $mdDialog, AuthenticationService){
        var self = this;

        self.reservations = DeviceReservation.query(function(data){

        });


        self.deviceReservationDeleted = deviceReservationDeleted;

        //public
        function deviceReservationDeleted(reservation){
            self.reservations.splice(self.reservations.indexOf(reservation), 1);
        }
    }

})();