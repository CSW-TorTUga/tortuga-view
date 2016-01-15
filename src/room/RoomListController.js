(function () {

    angular.module('management')
        .controller('RoomListController', [
            'RoomReservation',
            '$mdDialog',
            'AuthenticationService',
            RoomListController
        ]);

    function RoomListController(RoomReservation, $mdDialog, AuthenticationService) {
        var self = this;

        self.reservations = RoomReservation.query();

        self.addReservation = addReservation;
        self.reservationDeleted = reservationDeleted;


        //public
        function reservationDeleted(reservation) {
           self.reservations.splice(self.reservations.indexOf(reservation), 1);
        }


        //public
        function addReservation(event) {
            return $mdDialog.show({
                templateUrl: 'src/room/create.html',
                controller: ['$mdDialog', 'ErrorToasts', AddReservationController],
                controllerAs: 'roomModal',
                targetEvent: event
            }).then(function(reservation) {
                self.reservations.push(reservation);
            });


            function AddReservationController($mdDialog, ErrorToasts) {
                var self = this;

                self.submit = submit;
                self.cancel = cancel;

                self.validateTimeInput = validateTimeInput;


                //public
                function cancel() {
                    $mdDialog.cancel();
                }

                //public
                function validateTimeInput(input) {
                    return {
                        validFormat: /\d\d:\d\d/.test(input),
                        validHour: /[0-1][0-9]+2[0-3].*/.test(input),
                        validMinute: /.*[0-1][0-9]+2[0-3]$/.test(input)
                    }
                }

                //public
                function submit() {

                    var timeStart = angular.copy(self.day);
                    var time = self.startTimeString.split(":");

                    timeStart.setHours(time[0]);
                    timeStart.setMinutes(time[1]);

                    self.reservation.timeSpan = {};
                    self.reservation.timeSpan.beginning = timeStart.valueOf();


                    timeStart = angular.copy(self.day);
                    time = self.endTimeString.split(":");

                    timeStart.setHours(time[0]);
                    timeStart.setMinutes(time[1]);

                    self.reservation.timeSpan.end = timeStart.valueOf();


                    self.reservation.user = AuthenticationService.getUser();

                    RoomReservation.save(self.reservation).$promise
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

    }

})
();
