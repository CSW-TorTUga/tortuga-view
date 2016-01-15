(function() {
    angular.module('home')
        .controller('HomeController', [
            'RoomReservation',
            'DeviceReservation',
            HomeController
        ]);

    function HomeController(RoomReservation, DeviceReservation) {
        var self = this;

        var roomReservations = RoomReservation.query();

        var deviceReservations = DeviceReservation.query();


        self.onDeleteRoomReservation = onDeleteRoomReservation;
        self.onDeleteDeviceReservation = onDeleteDeviceReservation;



        //public
        function getRoomReservations() {
            var now = new Date().valueOf();
            return roomReservations.filter(function(reservation) {
                return reservation.openedTimeSpan.beginning <= now && now <= reservation.openedTimeSpan.end;
            })
        }


        //public
        function getDeviceReservations() {
            var now = new Date().valueOf();
            return deviceReservations.filter(function(reservation) {
                return reservation.timeSpan.beginning <= now && now <= reservation.timeSpan.end;
            })
        }



        //public
        function onDeleteRoomReservation(reservation) {
            self.roomReservations.splice(self.roomReservations.indexOf(reservation), 1);
        }


        //public
        function onDeleteDeviceReservation(reservation) {
            self.deviceReservations.splice(self.deviceReservations.indexOf(reservation), 1);
        }
    }

})();