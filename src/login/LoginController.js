(function () {

    angular.module('rms')
        .controller('LoginController', [
            'AuthenticationService',
            'ErrorToasts',
            '$state',
            LoginController
        ]);

    function LoginController(AuthenticationService, ErrorToasts, $state) {
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
                    ErrorToasts.show("Passwort und/oder Benutername sind falsch.", 5000, false);
                } else {
                    console.warn(response);
                }
            });
        }
    }

})();