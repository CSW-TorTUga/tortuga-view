(function() {

    angular.module('rms')
        .factory('errorInterceptor', [
            '$q',
            '$injector',
            errorInterceptor
        ]);

    function errorInterceptor($q, $injector) {
        function onResponseError(rejection) {
            if(rejection.status != 502 && rejection.status != 401) {
                $injector.get('ErrorToasts').show(rejection.data.errorMessage);
            }

            return $q.reject(rejection);
        }

        return {
            responseError: onResponseError
        };
    }

})();
