(function() {

    angular.module('tickets.support')
        .controller('RoomReservationApprovalListController', [
            'RoomReservation',
            '$mdDialog',
            RoomReservationApprovalListController
        ]);

    function RoomReservationApprovalListController(RoomReservation, $mdDialog) {
        var self = this;

        self.reservations = RoomReservation.query();

        self.decline = decline;
        self.declineAfterConfirm = declineAfterConfirm;
        self.accept = accept;

        //public
        function decline(reservation) {
            RoomReservation.delete({id:reservation.id}).$promise
                .then(function() {
                    self.reservations.splice(self.reservations.indexOf(reservation), 1);
                });
        }

        //public
        function declineAfterConfirm(reservation, event) {
            $mdDialog.show(
                $mdDialog.confirm()
                    .title('Raumbuchung "' + reservation.title + '" wirklich absagen?')
                    .ok('Ja')
                    .cancel('Abbrechen')
                    .targetEvent(event)
                    .content('Die bereits bestätigte Raumbuchung wird ohne Benachrichtigung des Buchenden gelöscht. Wirklich löschen?')
            ).then(function() {
                decline(reservation);
            });
        }


        //public
        function accept(reservation) {
            RoomReservation.update({id:reservation.id}, {approved: true}).$promise
                .then(function(updatedReservation) {
                    self.reservations[self.reservations.indexOf(reservation)] = updatedReservation;
                });
        }


    }

})();