(function() {

    angular.module('tickets.support')
        .controller('RoomReservationApprovalListController', [
            'RoomReservation',
            'AuthenticationService',
            '$mdDialog',
            'LocalService',
            RoomReservationApprovalListController
        ]);

    function RoomReservationApprovalListController(RoomReservation, AuthenticationService,  $mdDialog, LocalService) {
        var self = this;

        self.reservations = RoomReservation.query({
            "timeSpan.end": ">" + (new Date()).valueOf()
        });

        self.repeatedReservations = [];


        self.decline = decline;
        self.declineAfterConfirm = declineAfterConfirm;
        self.accept = accept;
        self.acceptAllRepeated = acceptAllRepeated;
        self.declineAllRepeated = declineAllRepeated;

        self.getRepeatedReservations = getRepeatedReservations;
        self.getDatesForRepeatedResevation = getDatesForRepeatedReservation;
        self.getReservationsBySharedId = getReservationsBySharedId;

        self.assignToMyself = assignToMyself;
        self.canBeOpenedNow = canBeOpenedNow;
        self.openRoom = openRoom;
        self.closeRoom = closeRoom;
        self.isLocal = LocalService.isLocal;

        //public
        function getReservationsBySharedId(sharedId){
            return self.reservations.filter(function (reservation) {
                return reservation.sharedId == sharedId && !reservation.approved;
            });
        }


        //public
        function getRepeatedReservations() {
            var sharedIds = self.reservations.filter(function(reservation) {
                return !reservation.approved && reservation.sharedId != undefined;
            }).reduce(function(aggregator, current) {

                for(var i = 0; i < aggregator.length; i++) {
                    if(aggregator[i] == current.sharedId) {
                        return aggregator;
                    }
                }

                aggregator.push(current.sharedId);
                return aggregator;
            }, []);
            return sharedIds;
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
            reservation.forEach(decline);
        }

        //public
        function acceptAllRepeated(reservation) {
            reservation.forEach(accept);
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

        function assignToMyself(reservation, event){
            $mdDialog.show(
                $mdDialog.confirm()
                    .title('Raumbuchung "' + reservation.title + '" wirklich Übernehmen?')
                    .ok('Ja')
                    .cancel('Abbrechen')
                    .targetEvent(event)
                    .content('Eigentum über das Event wird übertragen ohne den Ursprünglichen Eigentümer zu benachrichten.')
            ).then(function() {
                return RoomReservation.update({id: reservation.id}, {user: AuthenticationService.getUser()});
            });
        }

        //public
        function openRoom(reservation) {
            var updatedReservation = RoomReservation.update({id: reservation.id}, {open: true});

            updatedReservation.$promise.then(function() {
                reservation = updatedReservation;
            });
        }

        //public
        function closeRoom(reservation) {
            var updatedReservation = RoomReservation.update({id: reservation.id}, {open: false});

            updatedReservation.$promise.then(function() {
                reservation = updatedReservation;
            });
        }

        //public
        function canBeOpenedNow(reservation) {

            var now = new Date().valueOf();
            return reservation.approved && reservation.openedTimeSpan.beginning < now && now < reservation.openedTimeSpan.end;
        }

    }

})();