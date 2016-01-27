(function() {

    angular.module('profile')
        .controller('ChangePasswordModalController', [
            '$mdDialog',
            'AuthenticationService',
            'User',
            ChangePasswordModalController
        ]);

    function ChangePasswordModalController($mdDialog, AuthenticationService, User) {
        var self = this;

        self.cancel = $mdDialog.cancel;
        self.submit = submit;
        self.validatePasswordRepeat = validatePasswordRepeat;

        self.password = '';
        self.passwordRepeat = '';

        //public
        function validatePasswordRepeat(repeatedPassword) {
            if(self.password == repeatedPassword)
                return {
                    passwordMatch: true
                };

            return {
                passwordMatch: false
            };
        }

        //public
        function submit() {
            User.update({
                id: AuthenticationService.getUser().id
            }, {
                password: self.password
            }).$promise.then(function() {
                $mdDialog.hide();
            });
        }
    }

})();