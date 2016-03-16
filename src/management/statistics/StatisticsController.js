(function() {
    angular.module('management.statistics')
        .controller('StatisticsController', [
            'DeviceReservation',
            'Device',
            'DeviceCategory',
            'Major',
            'RoomReservation',
            'SupportMessage',
            'User',
            StatisticsController
        ]);


    function StatisticsController(DeviceReservation, Device, DeviceCategory, Major, RoomReservation, SupportMessage, User) {
        var self = this;

        self.allDeviceReservations = DeviceReservation.query();

        self.allRoomReservations = RoomReservation.query();

        self.allUsers = User.query();

        self.allDevices = Device.query();

        self.deviceResCount = undefined;
        self.deviceNames = undefined;
        self.reservationsPerDay = undefined;
        self.weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
        self.reservationCountPerDevicePerDayArray = undefined;

        self.reservationCount = reservationCount;
        self.getDeviceNames = getDeviceNames;
        self.reservationCountPerDay = reservationCountPerDay;
        self.reservationCountPerDevicePerDay = reservationCountPerDevicePerDay;
        self.updateType = updateType;

        self.graphs = [
            {
                name: 'Reservierungen nach Gerät',
                types: ['Bar'],
                data: reservationCount,
                labels: getDeviceNames,
                series: wrapperFunction('Geräte'),
                legend: false
            },
            {
                name: 'Reservierungen nach Wochentag',
                types: ['Bar','Line'],
                data: reservationCountPerDay,
                labels: wrapperFunction(self.weekDays),
                series: wrapperFunction('Geräte'),
                legend: false
            },
            {
                name: 'Reservierungen nach Gerät und  Wochentag',
                types: ['Line'],
                data: reservationCountPerDevicePerDay,
                labels: wrapperFunction(self.weekDays),
                series: getDeviceNames,
                legend: true
            }
        ];



        function wrapperFunction(value) {
            return function() {
                return value;
            }
        }



        //public
        function updateType() {
            self.selectedType = self.selectedGraph.types[0];
        }


        //public
        function getDeviceNames() {
            if(self.deviceNames == undefined && self.allDevices.length != 0) {
                self.deviceNames = self.allDevices.map(function(device) {
                    return device.name
                });
            }
            return self.deviceNames;
        }


        //public
        function reservationCountPerDay() {
            if(self.reservationsPerDay == undefined && self.allDeviceReservations.length != 0) {
                self.reservationsPerDay = [];
                for(var i = 0; i < 7; i++) {
                    self.reservationsPerDay[i] = self.allDeviceReservations.filter(function(res) {
                        return new Date(res.timeSpan.beginning).getDay() == i;
                    }).length;
                }
                self.reservationsPerDay = [self.reservationsPerDay];
            }
            return self.reservationsPerDay;
        }


        //public
        function reservationCountPerDevicePerDay() {
            if(self.reservationCountPerDevicePerDayArray == undefined && self.allDevices.length != 0 && self.allDeviceReservations.length != 0) {
                self.reservationCountPerDevicePerDayArray = self.allDevices.map(function(device) {
                    var ret = [];
                    for(var i = 0; i < 7; i++) {
                        ret[i] = self.allDeviceReservations.filter(function(res) {
                            return res.device.id == device.id &&
                                (new Date(res.timeSpan.beginning)).getDay() == i;
                        }).length;
                    }
                    return ret;
                })
            }
            return self.reservationCountPerDevicePerDayArray;
        }


        //public
        function reservationCount() {
            if(self.deviceResCount == undefined && self.allDevices.length != 0 && self.allDeviceReservations.length != 0) {
                self.deviceResCount = [];
                self.deviceResCount.push(self.allDevices.map(function(device) {
                    return self.allDeviceReservations.filter(function(reservation) {
                        return reservation.device.id == device.id;
                    }).length;
                }));
            }
            return self.deviceResCount;
        }

    }

})();