(function() {

    angular.module('management')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('management.admin', {
                url: '/admin',
                templateUrl: 'src/management/admin/admin.html',
                controller: 'AdminController',
                controllerAs: 'adminController'
            });
        }]).controller('AdminController', [
        'Major',
        'DeviceCategory',
        AdminController
    ]);

    function AdminController(Major,DeviceCategory) {
        var self = this;
        self.majorService = Major;
        self.deviceCategoryService = DeviceCategory
    }

})();
