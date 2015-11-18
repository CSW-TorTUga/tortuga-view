(function() {

  angular.module('rms')
  .service('AuthenticationService', [
    '$timeout',
    UserService
  ]);

  function UserService($timeout) {
    var self = this;

    var loggedIn = false;

    $timeout(function() {
      loggedIn = true;
    }, 3000)

    self.isLoggedIn = isLoggedIn;

    function isLoggedIn() {
      return loggedIn;
    }
  }

})();
