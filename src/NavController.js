(function() {

    angular.module('rms')
        .controller('NavController', [
            '$state',
            'AuthenticationService',
            '$mdDialog',
            NavController
        ]);

    function NavController($state, AuthenticationService, $mdDialog) {
        var self = this;

        self.isInState = isInState;
        self.supportTicket = supportTicket;

        self.isLoggedIn = AuthenticationService.isLoggedIn;
        self.logout = AuthenticationService.logout;

        //public
        function isInState(state) {
            return $state.includes(state);
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
