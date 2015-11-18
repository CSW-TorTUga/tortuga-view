(function () {
    angular.module('management.roles')
        .factory('RoleService', [
            '$resource',
            'apiAddress',
            RoleService
        ]);

    function RoleService($resource, apiAddress) {
        return $resource(apiAddress + 'roles/:role:id', {roleId: '@id'});
    }
})();