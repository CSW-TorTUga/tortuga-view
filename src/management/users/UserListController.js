(function() {

  angular.module('management.users')
  .controller('UserListController', [
    UserListController
  ]);

  function UserListController() {
    var self = this;

    var users = [
      {
        firstName: 'Leon',
        lastName: 'Strauss',
        role: 'Dozent',
        userName: 'LionC',
        expires: 1447259704480
      },
      {
        firstName: 'Mischa',
        lastName: 'Holz',
        role: 'Admin',
        userName: 'Fohl',
        expires: 1447267704480
      },
      {
        firstName: 'Hannes',
        lastName: 'Güdelhöfer',
        role: 'CSW-Team',
        userName: 'reckter',
        expires: 1447257704480
      },
      {
        firstName: 'Dennis',
        lastName: 'Schirmer',
        role: 'Benutzer',
        userName: 'LordCola',
        expires: 1447257704480
      }
    ];

    users = users.concat(users).concat(users).concat(users);

    self.getUsers = getUsers;

    function getUsers() {
      return users;
    }
  }

})();
