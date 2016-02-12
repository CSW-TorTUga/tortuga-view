(function () {

    angular.module('login')
        .controller('LoginController', [
            'AuthenticationService',
            'ErrorToasts',
            '$state',
            '$animate',
            '$location',
            LoginController
        ]);

    function LoginController(AuthenticationService, ErrorToasts, $state, $animate, $location) {
        var self = this;

        self.username = '';
        self.password = '';
        self.longToken = false;

        self.login = login;
        self.isTerminal = isTerminal;

        //public
        function login() {
            AuthenticationService.login(self.username, self.password, self.longToken)
                .then(function () {
                    $state.go('home');
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
    }

})();