(function() {

    angular.module('rms')
        .factory('User', [
            '$resource',
            'apiAddress',
            UserService
        ]);

    function UserService($resource, apiAddress) {
        return $resource(apiAddress + 'users/:userId');
    }
    
})();
