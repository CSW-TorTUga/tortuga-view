(function () {

    angular.module('login')
        .controller('LoginController', [
            'AuthenticationService',
            'ErrorToasts',
            '$state',
            '$animate',
            LoginController
        ]);

    function LoginController(AuthenticationService, ErrorToasts, $state, $animate) {
        var self = this;

        self.username = '';
        self.password = '';

        self.login = login;

        //public
        function login() {
            AuthenticationService.login(self.username, self.password)
                .then(function () {
                    $state.go('home');
                }).catch(function (response) {
                    if (response.status == 401) {
                        ErrorToasts.show("Benutzername und/oder Passwort sind falsch.", 3500, false);
                    } else {
                        console.warn(response);
                    }
                });
        }
    }

})();