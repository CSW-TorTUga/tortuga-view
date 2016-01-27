(function () {

    angular.module('rms')
        .controller('NavController', [
            '$state',
            'AuthenticationService',
            'TimeoutService',
            NavController
        ]);

    function NavController($state, AuthenticationService, TimeoutService) {
        var self = this;

        self.isInState = isInState;

        self.isLoggedIn = AuthenticationService.isLoggedIn;
        self.logout = AuthenticationService.logout;

        self.somethingHappened = TimeoutService.somethingHappened;

        function isInState(state) {
            return $state.$current.name.indexOf(state) != -1;
        }
    }

})();
