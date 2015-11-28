(function() {

    angular.module('rms')
        .factory('sessionTimeoutInterceptor', [
            '$q',
            'ErrorToasts',
            '$injector',
            sessionTimeoutInterceptor]
        );

    function sessionTimeoutInterceptor($q, ErrorToasts, $injector) {
        var $state = $injector('$state');

        /*function onRequest(reqConfig) {
            LoadingStateService.startedLoading();

            return reqConfig;
        }

        function onResponse(response) {
            LoadingStateService.finishedLoading();

            return response;
        }*/

        function onResponseError(rejection) {
            //LoadingStateService.finishedLoading();

            if(rejection.status == 401 && $state.name == 'login') {
                $state.go('login');
            }

            /*if(rejection.status == 502) {
                ErrorToasts.show('Der Server ist nicht mehr erreichbar. Bitter überprüfen Sie Ihre Internetverbindung.', 'OK', 'error');
            }*/

            return $q.reject(rejection);
        }

        return {
            /*request: onRequest,
            response: onResponse,*/
            responseError: onResponseError
        };
    }

})();
