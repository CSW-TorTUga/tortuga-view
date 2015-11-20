(function() {

  angular.module('rms')
  .service('AuthenticationService', [
    '$timeout',
    AuthenticationService
  ]);

  function AuthenticationService($timeout) {
    var self = this;

    var loggedIn = false;

    $timeout(function fakeLogin() {
      loggedIn = true;
    }, 3000)

    self.isLoggedIn = isLoggedIn;

    function isLoggedIn() {
      return loggedIn;
    }
  }

})();
