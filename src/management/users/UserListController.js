(function () {

    angular.module('management.users')
        .controller('UserListController', [
            'UserService',
            '$mdDialog',
            UserListController
        ]);

    function UserListController(UserService, $mdDialog) {
        var self = this;

        self.users = UserService.query();

        self.editUser = editUser;
        self.createUser = createUser;

        //public
        function createUser(event) {
            editUser(self.users.length, event, true);
        }

        //public
        function editUser(index, event, createNewUser) {
            if (createNewUser === undefined) {
                createNewUser = false;
            }
            $mdDialog.show({
                clickOutsideToClose: true,
                templateUrl: 'src/management/users/create.html',
                controller: ['$mdDialog', 'RoleService', EditUserModalController],
                controllerAs: 'userModal',
                targetEvent: event,
                bindToController: true,
                locals: {
                    user: self.users[index]
                }
            }).then(function (user) {
                return UserService.save(user);
            }).then(function (user) {
                self.users[index] = user;
            }).catch(function (reason) {
                if (reason != undefined) {
                    console.warn(reason);
                }
            });


            function EditUserModalController($mdDialog, RoleService) {
                var self = this;

                //self.user argument
                self.newUser = createNewUser;

                self.roles = RoleService.query();

                self.submit = submit;
                self.cancel = cancel;

                self.header = "";

                init();
                function init() {
                    if(self.newUser) {
                        self.header = 'Neuen Benutzer anlegen';
                    } else {
                        self.header = "Den Benutzer '" + self.user.loginName + "' bearbeiten";
                    }
                }

                //public
                function cancel() {
                    $mdDialog.cancel();
                }

                //public
                function submit() {
                    if(self.user.gender = "NONE") {
                        self.user.gender = undefined;
                    }
                    $mdDialog.hide(self.user);
                }

            }

        }
    }

})();
