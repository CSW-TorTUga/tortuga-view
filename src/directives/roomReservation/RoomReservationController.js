(function() {

    angular.module('rms')
        .controller('RoomReservationController', [
            '$scope',
            'RoomReservation',
            '$mdDialog',
            RoomReservationController
        ]);

    function RoomReservationController($scope, RoomReservation, $mdDialog) {
        var self = this;

        //self.reservation
        //self.onDelete

        self.openRoom = openRoom;
        self.returnRoom = returnRoom;
        self.deleteReservation = deleteReservation;
        self.canBeOpenedNow = canBeOpenedNow;
        self.getState = getState;

        console.dir(self.reservation);

        //public
        function getState() {
            if(self.reservation.open) {
                return "Daueröffnung aktiv";
            }
            if(self.reservation.approved) {
                return "Bestätigt";
            }
            return "In Bearbeitung";
        }


        //public
        function openRoom() {
            //TODO
        }

        //public
        function returnRoom() {
            alert(self.reservation.room.name + ' zurückgegeben');
        }

        //public
        function deleteReservation() {
            var dialog = $mdDialog.confirm()
                .title("Raumbuchung löschen?")
                .textContent("Raumbuchung wirklich löschen? Dies kann nicht rückgängig gemacht werden!")
                .ok("löschen")
                .targetEvent(event)
                .cancel("abbrechen");
            $mdDialog.show(dialog, event).then(function () {
                return RoomReservation.delete({id: self.reservation.id}).$promise;
            }).then(function () {
                self.onDelete(self.reservation);
            }).catch(function (fail) {
                console.warn(fail);
            });
        }

        //public
        function canBeOpenedNow() {

            console.dir(self.reservation);
            var now = new Date().valueOf();
            return self.reservation.approved && self.reservation.openedTimeSpan.beginning < now && now < self.reservation.openedTimeSpan.end;
        }

    }

})();