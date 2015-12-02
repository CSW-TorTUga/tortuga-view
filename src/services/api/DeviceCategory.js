(function() {

    angular.module('rms')
        .factory('DeviceCategory', [
            '$resource',
            'apiAddress',
            DeviceCategory
        ]);

    function DeviceCategory($resource, apiAddress) {
        return $resource(apiAddress + 'devicecategories/:deviceCategoryId', null, {update: { method: 'PATCH'}});
    }

})();
