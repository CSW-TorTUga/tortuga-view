(function () {

    angular.module('management')
        .controller('RoomListController', [
        'RoomReservation',
        '$mdDialog',
        RoomListController
    ]);

    function RoomListController(RoomReservations, $mdDialog) {
        var self = this;

        self.reservations = RoomReservations.query();

        self.canBeOpenedNow = canBeOpenedNow;


        //public
        function canBeOpenedNow(reservation) {
            var now = new Date().valueOf();
            return reservation.openedTimeSpan.beginning < now && reservation.openedTimeSpan.end;
        }

    }

})
();
