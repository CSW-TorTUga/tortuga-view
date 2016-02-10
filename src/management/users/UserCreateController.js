(function() {
    angular.module('management.users')
        .controller('UserCreateController', [
            'User',
            'Major',
            '$state',
            'PinService',
            '$window',
            UserCreateController
        ]);

    function UserCreateController(User, Major, $state, PinService, $window) {
        var self = this;
        var state = 0;

        self.majors = Major.query();

        self.getState = getState;
        self.back = back;
        self.advance = advance;
        self.save = save;
        self.validatePasswordRepeat = validatePasswordRepeat;

        self.pin = [];

        self.user = {};
        self.user.gender = "NONE";

        //self.user is being build by the states


        function getState() {
            return state;
        }

        function back() {
            $window.scrollTo(0,0);
            state--;
        }

        function advance() {
            state++;
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
        function save() {
            if(self.user.gender == "NONE") {
                self.user.gender = undefined;
            }
            self.user.enabled = true;
            self.user.password = self.password1;
            User.save(self.user).$promise
                .then(function(user) {
                    PinService.createNewPin(user).then(function() {
                        $state.go('management.users.finish' ,{user: user});
                    });
                })
        }


    }
})();