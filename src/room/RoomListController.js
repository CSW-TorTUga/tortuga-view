(function () {

    angular.module('management')
        .controller('RoomListController', [
            'RoomReservation',
            '$mdDialog',
            RoomListController
        ]);

    function RoomListController(RoomReservation, $mdDialog) {
        var self = this;

        self.reservations = RoomReservation.query();

        self.canBeOpenedNow = canBeOpenedNow;
        self.removeReservation = removeReservation;
        self.addReservation = addReservation;


        //public
        function addReservation(event) {
            console.log("a");
            return $mdDialog.show({
                templateUrl: 'src/room/create.html',
                controller: ['$mdDialog', 'ErrorToasts', AddReservationController],
                controllerAs: 'roomModal',
                targetEvent: event
            });


            function AddReservationController($mdDialog, ErrorToasts) {
                var self = this;


                self.submit = submit;
                self.cancel = cancel;


                //public
                function cancel() {
                    $mdDialog.cancel();
                }

                //public
                function submit() {
                    RoomReservation.save(self.device).$promise
                        .then(function (device) {
                            $mdDialog.hide(device);
                        }).catch(function (reason) {
                        ErrorToasts.show(reason);
                        if (reason != undefined) {
                            console.warn(reason);
                        }
                    });
                }

            }
        }

        //public
        function removeReservation(event, reservation) {
            var dialog = $mdDialog.confirm()
                .title("Raumbuchung löschen?")
                .textContent("Raumbuchung wirklich löschen? Dies kann nicht rückgängig gemacht werden!")
                .ok("löschen")
                .targetEvent(event)
                .cancel("abbrechen");
            $mdDialog.show(dialog, event).then(function () {
                return RoomReservation.delete({id: reservation.id}).$promise;
            }).then(function (response) {
                self.reservations.splice(self.reservations.indexOf(reservation), 1);
            }).catch(function (fail) {
                console.warn(fail);
            });
        }


        //public
        function canBeOpenedNow(reservation) {
            var now = new Date().valueOf();
            return reservation.openedTimeSpan.beginning < now && now < reservation.openedTimeSpan.end;
        }

    }

})
();
