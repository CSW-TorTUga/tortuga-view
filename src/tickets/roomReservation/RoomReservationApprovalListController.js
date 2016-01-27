(function() {

    angular.module('tickets.support')
        .controller('RoomReservationApprovalListController', [
            'RoomReservation',
            'ErrorToasts',
            RoomReservationApprovalListController
        ]);

    function RoomReservationApprovalListController(RoomReservation,ErrorToasts) {
        var self = this;

        self.reservations = RoomReservation.query({approved: false});

        self.ignore = ignore;
        self.accept = accept;

        //public
        function ignore(reservation) {
            RoomReservation.delete({id:reservation.id}).$promise
                .then(function() {
                    self.reservations.splice(self.reservations.indexOf(reservation), 1);
                })
                .catch(function(reason) {
                    ErrorToasts.show(reason);
                    if(reason != undefined) {
                        console.warn(reason);
                    }
                });
        }


        //public
        function accept(reservation) {
            reservation.approved = true;
            RoomReservation.update({id:reservation.id}, reservation).$promise
                .then(function() {
                    self.reservations.splice(self.reservations.indexOf(reservation), 1);
                })
                .catch(function(reason) {
                    ErrorToasts.show(reason);
                    if(reason != undefined) {
                        console.warn(reason);
                    }
                });

        }


    }

})();