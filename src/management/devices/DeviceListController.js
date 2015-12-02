(function () {

    angular.module('management')
        .config(['$stateProvider', function ($stateProvider) {
            $stateProvider.state('management.devices', {
                url: '/devices',
                templateUrl: 'src/management/devices/list.html',
                controller: 'DeviceListController',
                controllerAs: 'deviceList'
            });
        }]).controller('DeviceListController', [
        'Device',
        'DeviceCategory',
        '$mdDialog',
        DeviceListController
    ]);

    function DeviceListController(Device, DeviceCategory, $mdDialog) {
        var self = this;

        self.categories = [{id:'bla', name:'Laptop'}, {id:'bla2', name:'Beamer'}]; //DeviceCategory.query();

        self.devices = [
            {
                inventoryNumber: 2341,
                name: 'Acer A41',
                category: self.categories[0],
                storage: 5,
                acquired: 1447340875206
            },
            {
                inventoryNumber: 8475,
                name: 'Asus Z12',
                category: self.categories[0],
                storage: 3,
                acquired: 1447320875206
            },
            {
                inventoryNumber: 1131,
                name: 'Amilo Pi 3540',
                category: self.categories[0],
                storage: 2,
                acquired: 1441340875206
            },
            {
                inventoryNumber: 8364,
                name: 'Wacom SuperBeam',
                category: self.categories[1],
                storage: 5,
                acquired: 1447340875206
            }
        ];


        self.editDevice = editDevice;
        self.createDevice = createDevice;


        //public
        function createDevice(event) {
            editDevice(event);
        }

        //public
        function editDevice(event, device) {
            if (device === undefined) {
                var createNewDevice = true;
                device = new Device();
            } else {
                var createNewDevice = false
            }
            $mdDialog.show({
                templateUrl: 'src/management/devices/create.html',
                controller: ['$mdDialog', 'DeviceCategory', EditDeviceModalController],
                controllerAs: 'deviceModal',
                targetEvent: event,
                bindToController: true,
                locals: {
                    device: angular.copy(device)
                }
            });


            function EditDeviceModalController($mdDialog, DeviceCategory) {
                var self = this;

                //self.device argument
                self.newDevice = createNewDevice;

                self.submit = submit;
                self.cancel = cancel;

                self.header = "";

                self.categories = [{id:'bla', name:'Laptop'}, {id:'bla2', name:'Beamer'}];//DeviceCategory.query();


                init();
                function init() {
                    console.log(self.device);
                    if (self.newDevice) {
                        self.header = 'Neues Gerät anlegen';
                    } else {
                        self.header = "Gerät '" + self.device.name + "' bearbeiten";
                    }
                    if(self.device.acquired !== undefined) {
                        self.dateAcquired = new Date(self.device.acquired);
                    }
                }

                //public
                function cancel() {
                    $mdDialog.cancel();
                }

                //public
                function submit() {

                    self.device.acquired = self.dateAcquired.valueOf();
                    var promise;
                    if (createNewDevice) {
                        promise = Device.save(device).$promise;
                    } else {
                        promise = Device.update({deviceId: device.id}, device).$promise;
                    }

                    promise.then(function (device) {
                        self.devices.push(device);
                        $mdDialog.hide(device);
                    }).catch(function (reason) {
                        if (reason != undefined)
                            console.warn(reason);
                    });
                }

            }
        }
    }

})
();
