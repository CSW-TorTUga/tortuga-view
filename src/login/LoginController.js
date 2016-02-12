(function () {

    angular.module('login')
        .controller('LoginController', [
            'AuthenticationService',
            'ErrorToasts',
            '$state',
            '$animate',
            '$location',
            '$http',
            '$stateParams',
            '$q',
            LoginController
        ]);

    function LoginController(AuthenticationService, ErrorToasts, $state, $animate, $location, $http, $stateParams, $q) {
        var self = this;

        self.username = '';
        self.password = '';
        self.longToken = false;

        self.login = login;
        self.isTerminal = isTerminal;

        self.loginButtonText = 'Anmelden';

        var token = $stateParams.t;
        if(!!token) {
            openDoorWithToken(token).then(function() {
                $state.go('doorSuccess');
            }).catch(function() {
                self.loginButtonText = 'Anmelden & Tür öffnen';
            })
        } else {
            if(AuthenticationService.isLoggedIn()) {
                $state.go('home');
            }
        }

        // public
        function login() {
            AuthenticationService.login(self.username, self.password, self.longToken)
                .then(function() {
                    if(!!token) {
                        return openDoorWithToken(token);
                    } else {
                        $state.go('home');
                    }
                }).then(function() {
                    if(!!token) {
                        $state.go('doorSuccess');
                    }
                }).catch(function (response) {
                    if (response.status == 401) {
                        ErrorToasts.show("Benutzername und/oder Passwort sind falsch.", 3500, false);
                    }
                });
        }

        // public
        function isTerminal() {
            return $location.host().indexOf('192.168') != -1;
        }

        function openDoorWithToken(token) {
            if(!token) {
                return $q.reject();
            }

            return $http.patch('/api/v1/terminal/door', {
                open: true
            }, {
                params: {
                    token: token
                }
            });
        }
    }

})();