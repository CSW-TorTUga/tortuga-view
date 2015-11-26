(function() {

    angular.module('profile')
        .controller('ProfileController', [
            'AuthenticationService',
            ProfileController
        ]);

    function ProfileController(AuthenticationService) {
        var self = this;

        self.getUser = AuthenticationService.getUser;

        self.getGender = getGender;
        self.getRole = getRole;

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