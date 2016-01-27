(function() {

    angular.module('profile')
        .controller('ProfileController', [
            'AuthenticationService',
            '$mdDialog',
            ProfileController
        ]);

    function ProfileController(AuthenticationService, $mdDialog) {
        var self = this;

        self.getUser = AuthenticationService.getUser;

        self.getGender = getGender;
        self.getRole = getRole;
        self.changePassword = changePassword;

        //public
        function changePassword(event) {
            $mdDialog.show({
                templateUrl: 'src/profile/changePasswordModal.html',
                controller: 'ChangePasswordModalController',
                controllerAs: 'passwordModal',
                targetEvent: event
            });
        }

        function getGender() {
            switch(self.getUser().gender) {
                case 'MALE':
                    return 'Männlich';
                case 'FEMALE':
                    return 'Weiblich';
                default:
                    return self.getUser().gender;
            }
        }

        function getRole() {
            switch(self.getUser().role) {
                case 'STUDENT':
                    return 'Student';
                case 'LECTURER':
                    return 'Dozent';
                case 'CSW_TEAM':
                    return 'CSW Team';
                case 'ADMIN':
                    return 'Admin';
                default:
                    return self.getUser().role;
            }
        }
    }

})();