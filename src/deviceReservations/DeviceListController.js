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
            console.dir(data);
        });

        function deviceReservationDeleted(reservation){
            for(var i = 0; i <= self.reservations.length; i++){
                if(self.reservations[i] === reservation){
                    self.reservations.splice(i, 1);
                    break;
                }
            }
        }
    }

})();