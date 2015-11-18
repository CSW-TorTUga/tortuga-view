(function () {
    angular.module('management.users')
        .factory('UserService', [
            '$resource',
            'apiAddress',
            UserService
        ]);

    function UserService($resource, apiAddress) {
        return $resource(apiAddress + 'users/:userId', {userId: '@id'});
    }
})();