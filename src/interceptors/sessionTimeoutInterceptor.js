(function() {

    angular.module('rms')
        .factory('sessionTimeoutInterceptor', [
            '$q',
            '$injector',
            sessionTimeoutInterceptor
        ]);

    function sessionTimeoutInterceptor($q, $injector) {
        function onResponseError(rejection) {
            var $state = $injector.get('$state');

            if(rejection.status == 403 || (rejection.status == 401 && $state.name != 'login')) {
                $injector.get('AuthenticationService').logout();
            }

            return $q.reject(rejection);
        }

        return {
            responseError: onResponseError
        };
    }

})();
