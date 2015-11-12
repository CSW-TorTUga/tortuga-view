(function () {

    angular.module('management.users')
        .controller('UserListController', ['UserService',
            UserListController
        ]);

    function UserListController(UserService) {
        var self = this;

        var users = UserService.get();

        self.getUsers = getUsers;

        //public
        function getUsers() {
            return users;
        }
    }

})();
