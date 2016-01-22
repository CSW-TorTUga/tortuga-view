(function() {

    angular.module('rms')
        .factory('SuppportMessage', [
            '$resource',
            'apiAddress',
            SuppportMessage
        ]);

    function SuppportMessage($resource, apiAddress) {
        return $resource(apiAddress + 'supportmessages/:id', null, {update: { method: 'PATCH'}});
    }

})();
