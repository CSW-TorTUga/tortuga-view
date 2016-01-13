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
            self.reservation.borrowed = true;
            self.reservation = DeviceReservation.update({id: self.reservation.id},self.reservation);
        }

        //public
        function returnDevice() {
            self.reservation.borrowed = false;
            self.reservation = DeviceReservation.update({id: self.reservation.id},self.reservation);
        }



        //public
        function deleteReservation() {

            var dialog = $mdDialog.confirm()
                .title("Reservierung für  " + self.reservation.device.name + " am " +self.reservation.timeSpan.beginning
                    + " löschen?")
                .textContent("Den Benutzer " + user.loginname + " wirklich löschen? Dies kann nicht rückgängig gemacht werden!")
                .ok("löschen")
                .targetEvent(event)
                .cancel("abbrechen");
            $mdDialog.show(dialog).then(function() {
                return UserService.delete({userId: user.id}).$promise;
            }).then(function(response) {
                self.users.splice(index, 1);
            }).catch(function(fail) {
                console.warn(fail);
            });

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
            console.dir(self.reservation);

            return now >= self.reservation.timeSpan.beginning && now <= self.reservation.timeSpan.end;
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