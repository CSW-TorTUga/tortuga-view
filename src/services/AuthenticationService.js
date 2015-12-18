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

        var loggedIn = false; //todo $cookies.get('auth_token') != undefined;
        var user = null;

        $rootScope.$on('$stateChangeStart', function onStateChange(event, to) {
            if(!loggedIn && to.name != 'login') {
                event.preventDefault();
                $state.go('login');
            }
        });

        self.login = login;
        self.logout = logout;
        self.isLoggedIn = isLoggedIn;
        self.getUser = getUser;

        //public
        function isLoggedIn() {
            return loggedIn;
        }

        //public
        function getUser() {
            return user;
        }

        //public
        function login(username, password) {
            var httpPromise = $http.post(apiAddress + 'login', {
                loginName: username,
                password: password
            });

            httpPromise.then(function(response) {
                loggedIn = true;
                user = response.data;
            });

            return httpPromise;
        }

        //public
        function logout() {
            $cookies.remove('auth_token');

            loggedIn = false;
            user = null;

            $state.go('login');
        }
    }

})();
