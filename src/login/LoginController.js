(function() {

    angular.module('rms')
        .controller('LoginController', [
            'AuthenticationService',
            LoginController
        ]);

    function LoginController(AuthenticationService) {
        var self = this;

        self.username = '';
        self.password = '';

        self.login = login;

        //public
        function login() {
            AuthenticationService.login(self.username, self.password);
        }
    }

})();