(function() {

  angular.module('management')
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('management.devices', {
      url: '/devices',
      templateUrl: 'src/management/devices/devices.html',
      controller: 'DeviceListController',
      controllerAs: 'deviceList'
    });
  }]).controller('DeviceListController', [
    DeviceListController
  ]);

  function DeviceListController() {
    var self = this;

    var devices = [
      {
        inventoryNumber: 2341,
        name: 'Acer A41',
        type: 'Laptop',
        storage: 5,
        acquired: 1447340875206
      },
      {
        inventoryNumber: 8475,
        name: 'Asus Z12',
        type: 'Laptop',
        storage: 3,
        acquired: 1447320875206
      },
      {
        inventoryNumber: 1131,
        name: 'Amilo Pi 3540',
        type: 'Laptop',
        storage: 2,
        acquired: 1441340875206
      },
      {
        inventoryNumber: 8364,
        name: 'Wacom SuperBeam',
        type: 'Beamer',
        storage: 5,
        acquired: 1447340875206
      }
    ];

    devices = devices.concat(devices).concat(devices).concat(devices);

    self.getDevices = getDevices;

    function getDevices() {
      return devices;
    }
  }

})();
