(function () {

    angular.module('management.users')
        .controller('UserListController', [
            'User',
            '$mdDialog',
            UserListController
        ]);

    function UserListController(User, $mdDialog) {
        var self = this;

        self.users = User.query(function(usersres) {
            console.log(usersres);
        });

        self.showDetails = showDetails;
        self.editUser = editUser;
        self.createUser = createUser;

        function showDetails(user, event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                templateUrl: 'src/management/users/details.html',
                controller: ['$mdDialog', UserDetailsModalController],
                controllerAs: 'userDetails',
                targetEvent: event,
                bindToController: true,
                locals: {
                    user: user
                }
            });

            function UserDetailsModalController($mdDialog) {
                var self = this;

                //self.user local

                self.close = close;

                function close() {
                    $mdDialog.cancel();
                }
            }
        }

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
                if (reason != undefined)
                    console.warn(reason);
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
                    self.user.password = self.password1;
                    $mdDialog.hide(self.user);
                }

            }

        }
    }

})();
