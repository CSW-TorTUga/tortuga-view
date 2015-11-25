(function () {

    angular.module('rms')
        .service('AuthenticationService', [
            '$timeout',
            '$http',
            'apiAddress',
            '$cookies',
            AuthenticationService
        ]);

    function AuthenticationService($timeout, $http, $cookies, apiAddress) {
        var self = this;

        var loggedIn = false;

        $timeout(function () {
            loggedIn = true;
        }, 3000);

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
        }
    }

})();
