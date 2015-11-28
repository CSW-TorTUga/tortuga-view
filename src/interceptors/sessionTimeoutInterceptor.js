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

            if(rejection.status == 401 && $state.name == 'login') {
                $state.go('login');
            }

            return $q.reject(rejection);
        }

        return {
            responseError: onResponseError
        };
    }

})();
