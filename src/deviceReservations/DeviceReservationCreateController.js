/**
 * Created by Schir on 22.01.2016.
 */

(function() {
    angular.module('deviceReservations')
        .controller('DeviceReservationCreateController', [
            '$mdDialog',
            'ErrorToasts',
            DeviceReservationCreateController
        ]);


    function DeviceReservationCreateController($mdDialog, ErrorToasts){
        var self = this;

        self.deviceSelection = false;
        self.nextButtonText = "Weiter";
        self.deviceCategories = ["Laptop", "Beamer", "Tasche"];
        self.selectedDeviceCategory = undefined;
        self.selectedDevice = undefined;

        self.activateDeviceSelection = activateDeviceSelection;
        self.isFormOneValid = isFormOneValid;


        function isFormOneValid(){
            return true;
        }

        function activateDeviceSelection(){
            self.deviceSelection = !self.deviceSelection;
        }
    }

})();