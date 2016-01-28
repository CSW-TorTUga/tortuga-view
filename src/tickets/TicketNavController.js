(function() {
    angular.module('tickets')
        .controller('TicketNavController', [
            'RoomReservation',
            'SupportMessage',
            '$interval',
            TicketNavController
        ]);

    function TicketNavController(RoomReservation, SupportMessage, $interval) {
        var self = this;

        var reservations = [];
        var tickets = [];


        self.getReservationCount = getReservationCount;
        self.getTicketCount = getTicketCount;


        // $interval(refresh, 10 * 1000);

        refresh();
        function refresh(){
            RoomReservation.query({approved: false}).$promise
                .then(function(res) {
                    reservations = res;
                });

            SupportMessage.query({done:false}).$promise
                .then(function(tick) {
                    tickets = tick;
                });
        }

        //public
        function getReservationCount() {
            return reservations.length;
        }

        //public
        function getTicketCount() {
            return tickets.length;
        }

    }
})();