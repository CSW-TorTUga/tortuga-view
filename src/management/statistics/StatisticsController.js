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

        self.allMajors = Major.query();

        self.allDevices = Device.query();

        self.deviceResCount = undefined;
        self.deviceNames = undefined;
        self.reservationsPerDay = undefined;
        self.weekDays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
        self.reservationCountPerDevicePerDayArray = undefined;
        self.reservationPerGender = undefined;
        self.reservationPerMajor = undefined;
        self.majorNames = undefined;
        self.lengthLabelsArray = undefined;

        self.reservationCount = reservationCount;
        self.getDeviceNames = getDeviceNames;
        self.reservationCountPerDay = reservationCountPerDay;
        self.reservationCountPerDevicePerDay = reservationCountPerDevicePerDay;
        self.updateType = updateType;
        self.reservationCountPie = reservationCountPie;
        self.reservationsPerGender = reservationsPerGender;
        self.reservationsPerMajor = reservationsPerMajor;
        self.getMajorNames = getMajorNames;
        self.lengthLabels = lengthLabels;

        self.graphs = [
            {
                name: 'Reservierungen nach Gerät',
                types: [{name: 'Balken', type: 'Bar'}],
                data: reservationCount,
                labels: getDeviceNames,
                serie: wrapperFunction(['Devices']),
                legend: false
            },
            {
                name: 'Reservierungen nach Gerät (Kuchen)',
                types: [{name: 'Kuchen', type: 'Pie'}, {name: 'Donut', type: 'Doughnut'}],
                data: reservationCountPie,
                labels: getDeviceNames,
                serie: wrapperFunction(['Devices']),
                legend: false
            },
            {
                name: 'Reservierungen nach Wochentag',
                types: [{name: 'Balken', type: 'Bar'}, {name: 'Kurve', type: 'Line'}],
                data: reservationCountPerDay,
                labels: wrapperFunction(self.weekDays),
                serie: wrapperFunction(['Devices']),
                legend: false
            },
            {
                name: 'Reservierungen nach Gerät und  Wochentag',
                types: [{name: 'Kurve', type: 'Line'}],
                data: reservationCountPerDevicePerDay,
                labels: wrapperFunction(self.weekDays),
                serie: wrapperFunction(['Reservierungen']),
                legend: true
            },
            {
                name: 'Reservierungen nach Geschlecht',
                types: [{name: 'Kuchen', type: 'Pie'}, {name: 'Donut', type: 'Doughnut'}],
                data: reservationsPerGender,
                labels: wrapperFunction(['männlich', 'weiblich', 'K.A.']),
                serie: wrapperFunction(['Reservierungen']),
                legend: true
            },
            {
                name: 'Reservierungen nach Studiengang',
                types: [{name: 'Kuchen', type: 'Pie'}, {name: 'Donut', type: 'Doughnut'}],
                data: reservationsPerMajor,
                labels: getMajorNames,
                serie: wrapperFunction(['Reservierungen']),
                legend: true
            },
            {
                name: 'Reservierungen nach Länge',
                types: [{name: 'Kurve', type: 'Line'}],
                data: reservationsPerLength,
                labels: lengthLabels,
                serie: wrapperFunction(['Reservierungen']),
                legend: true
            }
        ];


        //public
        function lengthLabels() {
            if(self.lengthLabelsArray == undefined && self.reservationPerLengthArray != undefined) {
                self.lengthLabelsArray = [];
                for(var i in self.reservationPerLengthArray) {
                    self.lengthLabelsArray.push(i * 15);
                }
            }
            return self.lengthLabelsArray;
        }

        //public
        function reservationsPerLength() {
            if(self.reservationPerLengthArray == undefined && self.allDeviceReservations.length != 0) {
                self.reservationPerLengthArray = [];
                for(var i = 0; i < 60; i++) {
                    self.reservationPerLengthArray[i] = 0;
                }
                self.allDeviceReservations.forEach(function(reservation) {
                    var length = reservation.timeSpan.end - reservation.timeSpan.beginning;
                    length = Math.floor(length / 1000 / 60 / 10); // so we have an int
                    if(isNaN(self.reservationPerLengthArray)) {
                        self.reservationPerLengthArray[length] = 0;
                    }
                    self.reservationPerLengthArray[length]++;
                });
            }
            return self.reservationPerLengthArray;
        }

        //public
        function getMajorNames() {
            if(self.majorNames == undefined && self.allMajors.length != 0) {
                self.majorNames = self.allMajors.map(function(major) {
                    return major.name;
                })
            }
            return self.majorNames;
        }

        //public
        function reservationsPerMajor() {
            if(self.reservationPerMajor == undefined && self.allMajors.length != 0 && self.allDeviceReservations.length != 0) {
                self.reservationPerMajor = [];

                var userSet = new Set();
                self.allDeviceReservations.forEach(function(reservation) {
                    userSet.add(reservation.user.id);
                });

                var userArray = [];
                userSet.forEach(function(user) {
                    userArray.push(user)
                });

                self.allMajors.forEach(function(major) {
                    self.reservationPerMajor.push(userArray.filter(function(userId) {
                        var user = getUser(userId);
                        if(user.major == undefined) {
                            return false;
                        }
                        return user.major.id == major.id;
                    }).length);
                });
            }
            return self.reservationPerMajor;
        }

        function getUser(id) {
            for(var userIndex in self.allUsers) {
                if(self.allUsers[userIndex].id == id) {
                    return self.allUsers[userIndex];
                }
            }
            return null;
        }

        //public
        function reservationsPerGender() {
            if(self.reservationPerGender == undefined && self.allDeviceReservations.length != 0) {
                self.reservationPerGender = [0, 0, 0];
                var userSet = new Set();
                self.allDeviceReservations.forEach(function(reservation) {
                    userSet.add(reservation.user.id);
                });
                userSet.forEach(function(userId) {
                    var user = getUser(userId);
                    if(user.gender == "MALE") {
                        self.reservationPerGender[0]++;
                    } else if(user.gender == "FEMALE") {
                        self.reservationPerGender[1]++;
                    } else {
                        self.reservationPerGender[2]++;
                    }
                });
            }
            return self.reservationPerGender;
        }

        //public
        function reservationCountPie() {
            return reservationCount()[0];
        }

        function wrapperFunction(value) {
            return function() {
                return value;
            }
        }


        //public
        function updateType() {
            self.selectedType = self.selectedGraph.types[0].type;
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