(function () {

    angular.module('rms')
        .controller('NavController', [
            '$state',
            'AuthenticationService',
            'TimeoutService',
            '$mdDialog',
            '$rootScope',
            NavController
        ]);

    function NavController($state, AuthenticationService, TimeoutService, $mdDialog, $rootScope) {
        var self = this;

        self.isInState = isInState;
        self.supportTicket = supportTicket;
        self.isLoggedIn = AuthenticationService.isLoggedIn;
        self.logout = AuthenticationService.logout;

        self.somethingHappened = TimeoutService.somethingHappened;

        self.isStudent = AuthenticationService.isStudent;
        self.isLecturer = AuthenticationService.isLecturer;
        self.isCswTeam = AuthenticationService.isCswTeam;
        self.isAdmin = AuthenticationService.isAdmin;

        $rootScope.$on('$stateChangeStart', function onStateChange() {
            $mdDialog.cancel();
        });

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
