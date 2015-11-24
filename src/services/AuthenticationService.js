(function () {

    angular.module('rms')
        .service('AuthenticationService', [
            '$timeout',
            '$http',
            'apiAddress',
            UserService
        ]);

    function UserService($timeout, $http, apiAddress) {
        var self = this;

        var loggedIn = false;

        $timeout(function () {
            loggedIn = true;
        }, 3000);

        self.login = login;
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
    }

})();
