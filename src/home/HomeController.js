(function () {
    angular.module('home')
        .controller('HomeController', [
            'RoomReservation',
            'DeviceReservation',
            'AuthenticationService',
            HomeController
        ]);

    function HomeController(RoomReservation, DeviceReservation, AuthenticationService) {
        var self = this;

        var roomReservations = AuthenticationService.isLecturer() ? RoomReservation.query({user: AuthenticationService.getUser().id}) : [];

        var deviceReservations = DeviceReservation.query({user: AuthenticationService.getUser().id});


        self.onDeleteRoomReservation = onDeleteRoomReservation;
        self.onDeleteDeviceReservation = onDeleteDeviceReservation;
        self.getRoomReservations = getRoomReservations;
        self.getDeviceReservations = getDeviceReservations;


        //public
        function getRoomReservations() {
            var now = new Date().valueOf();
            return roomReservations.filter(function (reservation) {
                return reservation.openedTimeSpan.beginning <= now && now <= reservation.openedTimeSpan.end;
            })
        }


        //public
        function getDeviceReservations() {
            var now = new Date().valueOf();
            return deviceReservations.filter(function (reservation) {
                return reservation.timeSpan.beginning <= now && now <= reservation.timeSpan.end;
            })
        }


        //public
        function onDeleteRoomReservation(reservation) {
            roomReservations.splice(roomReservations.indexOf(reservation), 1);
        }


        //public
        function onDeleteDeviceReservation(reservation) {
            deviceReservations.splice(deviceReservations.indexOf(reservation), 1);
        }
    }

})();