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

        var loggedIn = $cookies.get('auth_token') != undefined;
        var user = loggedIn ? decodeUser($cookies.get('auth_token')) : null;

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

        function decodeUser(encodedUser) {
            var split = encodedUser.split('.');

            return JSON.parse(atob(decodeURIComponent(split[0]))).user;
        }

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
