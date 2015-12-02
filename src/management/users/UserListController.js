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


        //public
        function userExpiresThisSemester(index) {
            var user = self.users[index];
            var date = getNextSemesterEnd(new Date());
            return Math.abs(user.expires - date.valueOf()) < 60 * 60 * 10000;
        }

        //public
        function userIsInactive(index){
            var user = self.users[index];

            return user.expires < (new Date).valueOf();
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
        function extendValidTime(index, event) {
            var user = self.users[index];
            var date = new Date(user.expires);
            console.log(date);

            do {
                date.setMonth(date.getMonth() + 6);
            } while((new Date).valueOf() > date.valueOf());

            user.expires = date.valueOf();


            self.users[index] = UserService.update({userId: user.id}, user);
        }

        //public
        function setInactive(index, event) {
            var user = self.users[index];
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
            user.expires = date.valueOf();

            self.users[index] = UserService.update({userId: user.id}, user);
        }

        //public
        function validatePasswordRepeat() {
            return {
                samePassword: self.password1 == self.password2
            }
        }

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
                self.users.splice(index, 1);
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
                    console.log(self.user);

                    self.majors.$promise.then(function() {
                        console.log(self.majors[0]);
                    });
                    if(self.newUser) {
                        self.header = 'Neuen Benutzer anlegen';
                    } else {
                        self.header = "Benutzer '" + self.user.loginName + "' bearbeiten";
                    }
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
