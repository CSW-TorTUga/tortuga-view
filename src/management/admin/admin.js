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
        AdminController
    ]);

    function AdminController(Major,User) {
        var self = this;
        self.majorService = Major;
    }

})();
