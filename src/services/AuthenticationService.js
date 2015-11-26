(function () {

    angular.module('rms')
        .service('AuthenticationService', [
            '$http',
            'apiAddress',
            '$cookies',
            '$state',
            '$rootScope',
            AuthenticationService
        ]);

    function AuthenticationService($http, apiAddress, $cookies, $state, $rootScope) {
        var self = this;

        var loggedIn = false;

        $rootScope.$on('$stateChangeStart', function onStateChange(event, to) {
            if(!loggedIn && to.name != 'login') {
                event.preventDefault();
                $state.go('login');
            }
        });

        self.login = login;
        self.logout = logout;
        self.isLoggedIn = isLoggedIn;

        //public
        function isLoggedIn() {
            return loggedIn;
        }

        //public
        function login(username, password) {
            var httpPromise = $http.post(apiAddress + 'login', {
                loginName: username,
                password: password
            });

            httpPromise.then(function (response) {
                loggedIn = true;
            });

            return httpPromise;
        }

        //public
        function logout() {
            $cookies.remove('auth_token');

            loggedIn = false;

            $state.go('login');
        }
    }

})();
