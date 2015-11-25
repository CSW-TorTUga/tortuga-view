(function () {

    angular.module('management.users')
        .controller('UserListController', [
            'User',
            '$mdDialog',
            UserListController
        ]);

    function UserListController(UserService, $mdDialog) {
        var self = this;

        self.users = UserService.query(function(usersres) {
            console.log(usersres);
        });

        self.showDetails = showDetails;
        self.editUser = editUser;
        self.createUser = createUser;
        self.deleteUser = deleteUser;

        //public
        function deleteUser(index, event) {
            var user = self.users[index];
            var dialog = $mdDialog.confirm()
                .title("Benutzer " + user.loginname + " löschen?")
                .content("Den Benutzer " + user.loginname + " wirklich löschen? Dies kann nicht rückgängig gemacht werden!")
                .ok("löschen")
                .cancel("abbrechen");
            dialog.targetEvent = event;
            $mdDialog.show(dialog, event).then(function() {
                return UserService.delete({userId: user.id}).$promise;
            }).then(function(response) {
                delete self.users[index];
            }).catch(function(fail) {
                console.warn(fail);
            });
        }

        //public
        function showDetails(index, event) {
            var user = self.users[index];
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
                controller: ['$mdDialog', 'Major',  EditUserModalController],
                controllerAs: 'userModal',
                targetEvent: event,
                bindToController: true,
                locals: {
                    user: angular.copy(self.users[index])
                }
            }).then(function (user) {
                console.log(user);
                if(createNewUser) {
                    return UserService.save(user).$promise;
                } else {
                    return UserService.update({userId: user.id}, user);
                }

            }).then(function (user) {
                self.users[index] = user;
            }).catch(function (reason) {
                if (reason != undefined)
                    console.warn(reason);
            });


            function EditUserModalController($mdDialog, Major) {
                var self = this;

                //self.user argument
                self.newUser = createNewUser;

                self.submit = submit;
                self.cancel = cancel;

                self.header = "";

                self.majors = Major.query();

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
