(function() {

    angular.module('rms')
        .controller('DeviceReservationController', [
            '$scope',
            'DeviceReservation',
            '$mdDialog',
            DeviceReservationController
        ]);

    function DeviceReservationController($scope, DeviceReservation, $mdDialog) {
        var self = this;

        //self.reservation
        //self.onDelete

        self.borrow = borrow;
        self.returnDevice = returnDevice;
        self.deleteReservation = deleteReservation;
        self.isActive = isActive;
        self.isBorrowed = isBorrowed;
        self.canBeBorrowed = canBeBorrowed;

        //public
        function borrow() {
            alert(self.reservation.device.name + ' ausgeliehent');
        }

        //public
        function returnDevice() {
            alert(self.reservation.device.name + ' zurückgegeben');
        }

        //public
        function deleteReservation() {
            DeviceReservation.delete({id: self.reservation.id}).$promise
                .then(function() {
                    $scope.$eval(self.onDelete);
                });
        }

        //public
        function edit(event) {
            $mdDialog.show({
                template: [
                    '<md-dialog>',
                        '',
                        '',
                        '',
                    '</md-dialog>'
                ].join(''),
                controller: function EditDeviceReservationController() {

                },
                targetEvent: event
            })
        }

        //public
        function isActive() {
            var now = (new Date()).getTime();

            return now >= self.reservation.timestamp.beginning && now <= self.reservation.timestamp.end;
        }

        //public
        function isBorrowed() {
            return self.reservation.borrowed;
        }

        //public
        function canBeBorrowed() {
            return isActive() && !isBorrowed();
        }
    }

})();