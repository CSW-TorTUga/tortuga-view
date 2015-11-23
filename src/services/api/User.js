(function() {

    angular.module('rms')
        .factory('User', [
            '$resource',
            'apiAddress',
            User
        ]);

    function User($resource, apiAddress) {
        return $resource(apiAddress + 'users/:userId');
    }
    
})();
