(function() {

    angular.module('rms')
        .service('LocalService', [
            'apiAddress',
            '$cookies',
            '$http',
            LocalService
        ]);

    function LocalService(apiAddress, $cookies, $http) {
        var self = this;

        self.isLocal = isLocal;

        function isLocal() {
            if($cookies.get('is_local') == 'true') {
                return true;
            } else {
                $http.get(apiAddress + 'localnet').then(function() {
                    $cookies.put('is_local', 'true');
                }).catch(function() {
                    $cookies.put('is_local', 'false');
                });

                return false;
            }
        }
    }

})();