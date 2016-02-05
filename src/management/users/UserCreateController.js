(function() {
    angular.module('management.users')
        .controller('UserCreateController', [
            'User',
            'Major',
            '$state',
            '$http',
            'apiAddress',
            UserCreateController
        ]);

    function UserCreateController(User, Major, $state, $http, apiAddress) {
        var self = this;
        var state = 0;


        self.majors = Major.query();

        self.getState = getState;
        self.back = back;
        self.advance = advance;
        self.save = save;
        self.validatePasswordRepeat = validatePasswordRepeat;

        self.pin = [];

        //self.user is being build by the states


        function getState() {
            return state;
        }

        function back() {
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
            self.user.password = self.password1;
            User.save(self.user).$promise
                .then(function(user) {
                    $state.go("profile.newpin",{userId: user.id, goWhenFinished: "add"});
                })
        }


    }
})();