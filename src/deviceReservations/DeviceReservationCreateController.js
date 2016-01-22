/**
 * Created by Schir on 22.01.2016.
 */

(function() {
    angular.module('deviceReservations')
        .controller('DeviceReservationCreateController', [
            '$mdDialog',
            'ErrorToasts',
            'DeviceCategory',
            DeviceReservationCreateController
        ]);


    function DeviceReservationCreateController($mdDialog, ErrorToasts, DeviceCategory){
        var self = this;

        self.deviceSelection = false;
        self.nextButtonText = "Weiter";
        self.deviceCategories = ["Laptop", "Beamer", "Tasche"];
        self.devices = ["Laptop 1", "Laptop 2", "Laptop 3"];
        self.selectedDeviceCategory = undefined;
        self.selectedDevice = undefined;
        self.endTime = undefined;
        self.startTime = undefined;
        self.startDate = undefined;

        self.activateDeviceSelection = activateDeviceSelection;
        self.isFormOneValid = isFormOneValid;
        self.validateTimeInput = validateTimeInput;
        self.timesAreValid = timesAreValid;
        self.timespanIsValid = timespanIsValid;
        self.startTimeIsInFuture = startTimeIsInFuture;
        self.isFormTwoValid = isFormTwoValid;

        //public
        function isFormTwoValid(){
            return self.createForm.deviceSelector.$valid;
        }
        //public
        function isFormOneValid(){
            return self.createForm.startTime.$valid && self.createForm.endTime.$valid
                && self.createForm.deviceCategorySelector.$valid && self.createForm.datePicker.$valid
                && self.timespanIsValid() && self.startTimeIsInFuture();
        }

        //public
        function activateDeviceSelection(){
            self.deviceSelection = !self.deviceSelection;
        }

        //public
        function timesAreValid() {
            return self.createForm.startTime.$valid && self.createForm.endTime.$valid;
        }

        //public
        function startTimeIsInFuture() {
            if(!timesAreValid())
                return true;

            var date = angular.copy(self.startDate);
            var split = self.startTime.split(':');

            date.setHours(split[0]);
            date.setMinutes(split[1]);

            return date.getTime() > (new Date()).getTime();
        }

        //public
        function timespanIsValid() {
            if(!timesAreValid())
                return true;

            var startSplit = self.startTime.split(':');
            var endSplit = self.endTime.split(':');

            return parseInt(startSplit[0]) * 60 + parseInt(startSplit[1]) <
                parseInt(endSplit[0]) * 60 + parseInt(endSplit[1]);
        }


        //public
        function validateTimeInput(input) {
            if(input == undefined || input == '')
                return {
                    validTime: true
                };

            var ret = {
                validTime: false
            };

            var split = input.split(':');

            if(split.length != 2)
                return ret;

            if(split[0].length > 2)
                return ret;

            var hours = parseInt(split[0]);
            if(isNaN(hours) || hours > 24 || hours < 0)
                return ret;

            if(split[1].length != 2)
                return ret;

            var minutes = parseInt(split[1]);
            if(isNaN(minutes) || minutes > 60 || minutes < 0)
                return ret;

            return {
                validTime: true
            };
        }
    }

})();