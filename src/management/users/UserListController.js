(function () {

    angular.module('management.users')
        .controller('UserListController', [
            'User',
            '$mdDialog',
            UserListController
        ]);

    function UserListController(UserService, $mdDialog) {
        var self = this;

        self.users = UserService.query();

        self.showDetails = showDetails;
        self.editUser = editUser;
        self.createUser = createUser;
        self.deleteUser = deleteUser;
        self.validatePasswordRepeat = validatePasswordRepeat;
        self.extendValidTime = extendValidTime;
        self.setInactive = setInactive;
        self.userExpiresThisSemester = userExpiresThisSemester;
        self.userIsInactive = userIsInactive;
        self.activeFilter = activeFilter;

        self.isCreatingUser = false;
        self.showActive = true;

        self.userFilter = '';

        function userIsActive(user) {
            if(user.role != 'STUDENT')
                return user.enabled;

            var now = (new Date()).getTime();

            return user.expirationDate >= now && user.enabled;
        }

        //public
        function activeFilter(user) {
            return self.showActive ? userIsActive(user) : !userIsActive(user);
        }

        //public
        function userExpiresThisSemester(user) {
            var date = getNextSemesterEnd(new Date());
            return Math.abs(user.expirationDate - date.valueOf()) < 60 * 60 * 10000;
        }

        //public
        function userIsInactive(user){
            return user.expirationDate < (new Date).valueOf();
        }




        function getNextSemesterEnd(date) {
            if(date.getMonth() < 3) { //april
                date.setYear(3);
            } else if(date.getMonth() < 9) { //october
                date.setMonth(9);
            } else { // else it's after october so we set the date to october
                date.setMonth(3);
                date.setFullYear(date.getFullYear() + 1);
            }

            date = new Date(date.getFullYear(), date.getMonth());
            return date;
        }

        //public
        function extendValidTime(user, event) {
            var date = new Date(user.expirationDate);

            do {
                date.setMonth(date.getMonth() + 6);
            } while((new Date).valueOf() > date.valueOf());

            user.expirationDate = date.valueOf();


            user = UserService.update({id: user.id}, user);
        }

        //public
        function setInactive(user, event) {
            var date = new Date();



            if(date.getMonth() < 3) { //april
                date.setYear(date.getYear() - 1);
                date.setMonth(9); //
            } else if(date.getMonth() < 9) { //october
                date.setMonth(3);
            } else { // else it's after october so we set the date to october
                date.setMonth(9);
            }


            date = new Date(date.getFullYear(), date.getMonth());
            user.expirationDate = date.valueOf();

            //funktioniert das?
            user = UserService.update({id: user.id}, user);
        }

        //public
        function validatePasswordRepeat() {
            return {
                samePassword: self.password1 == self.password2
            }
        }

        //public
        function deleteUser(user, event) {
            var dialog = $mdDialog.confirm()
                .title("Benutzer " + user.loginName + " löschen?")
                .textContent("Den Benutzer " + user.loginName + " wirklich löschen? Dies kann nicht rückgängig gemacht werden!")
                .ok("löschen")
                .targetEvent(event)
                .cancel("abbrechen");
            $mdDialog.show(dialog).then(function() {
                return UserService.delete({id: user.id}).$promise;
            }).then(function(response) {
                var index = self.users.indexOf(user);
                self.users.splice(index, 1);
            }).catch(function(fail) {
                console.warn(fail);
            });
        }

        //public
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
        function editUser(userToEdit, event, createNewUser) {
            self.isCreatingUser = true;
            if (createNewUser === undefined) {
                createNewUser = false;
            }

            if(createNewUser){
                var userToEdit = {};
                userToEdit.gender = "NONE";
                userToEdit.enabled = true;
            }
            $mdDialog.show({
                templateUrl: 'src/management/users/create.html',
                controller: ['$mdDialog', 'Major',  EditUserModalController],
                controllerAs: 'userModal',
                targetEvent: event,
                bindToController: true,
                locals: {
                    user: angular.copy(userToEdit)
                }
            }).then(function (user) {
                if(createNewUser) {
                    return UserService.save(user).$promise;
                } else {
                    return UserService.update({id: user.id}, user);
                }

            }).then(function (user) {
                self.isCreatingUser = false;
                userToEdit = user;
            }).catch(function (reason) {
                self.isCreatingUser = false;
                if (reason != undefined)
                    console.warn(reason);
            });


            function EditUserModalController($mdDialog, Major) {
                var self = this;

                //self.user argument
                self.newUser = createNewUser;

                self.submit = submit;
                self.cancel = cancel;

                self.validatePasswordRepeat = validatePasswordRepeat;

                self.header = "";

                self.majors = Major.query();

                init();
                function init() {
                    if(self.newUser) {
                        self.header = 'Neuen Benutzer anlegen';
                    } else {
                        self.header = "Benutzer '" + self.user.loginName + "' bearbeiten";
                    }
                }

                //public
                function validatePasswordRepeat(repeatedPassword) {
                    if(self.password1 == repeatedPassword)
                        return {
                            passwordMatch: true
                        };

                    return {
                        passwordMatch: false
                    };
                }

                //public
                function cancel() {
                    $mdDialog.cancel();
                }

                //public
                function submit() {
                    if(self.user.gender == "NONE") {
                        self.user.gender = undefined;
                    }
                    self.user.password = self.password1;
                    $mdDialog.hide(self.user);
                }

            }

        }

    }

})();
