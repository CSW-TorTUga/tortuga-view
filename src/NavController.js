(function () {

    angular.module('rms')
        .controller('NavController', [
            '$state',
            'AuthenticationService',
            'TimeoutService',
            '$mdDialog',
            NavController
        ]);

    function NavController($state, AuthenticationService, TimeoutService, $mdDialog) {
        var self = this;

        self.isInState = isInState;
        self.supportTicket = supportTicket;
        self.isLoggedIn = AuthenticationService.isLoggedIn;
        self.logout = AuthenticationService.logout;

        self.somethingHappened = TimeoutService.somethingHappened;

        //public
        function isInState(state) {
            return $state.$current.name.indexOf(state) != -1;
        }

        //public
        function supportTicket() {
            $mdDialog.show({
                templateUrl: 'src/support/createSupportTicket.html',
                controller: 'CreateSupportTicketModalController',
                controllerAs: 'supportModal',
                targetEvent: event,
                bindToController: true
            });
        }
    }

})();
