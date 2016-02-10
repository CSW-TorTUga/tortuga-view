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
        self.acceptAllRepeated = acceptAllRepeated;
        self.declineAllRepeated = declineAllRepeated;

        self.getRepeatedReservations = getRepeatedReservations;
        self.getDatesForRepeatedResevation = getDatesForRepeatedReservation;

        //public
        function getRepeatedReservations() {
            return self.reservations.filter(function(reservation) {
                return !reservation.approved && reservation.sharedId != undefined;
            }).reduce(function(aggregator, current) {
                var foundPartner = false;

                for(var i = 0; i < aggregator.length; i++) {
                    if(aggregator[i].sharedId == current.sharedId) {
                        return aggregator;
                    }
                }

                aggregator.push(current);
                return aggregator;
            }, []);
        }

        //public
        function getDatesForRepeatedReservation(repeatedReservation) {
            return self.reservations.filter(function(reservation) {
                return !reservation.approved && reservation.sharedId == repeatedReservation.sharedId;
            });
        }

        //public
        function decline(reservation) {
            RoomReservation.delete({id:reservation.id}).$promise
                .then(function() {
                    self.reservations.splice(self.reservations.indexOf(reservation), 1);
                });
        }

        //public
        function declineAllRepeated(reservation) {
            getDatesForRepeatedReservation(reservation).forEach(decline);
        }

        //public
        function acceptAllRepeated(reservation) {
            getDatesForRepeatedReservation(reservation).forEach(accept);
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