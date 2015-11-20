(function() {

  angular.module('rms')
  .controller('NavController', [
    '$state',
    'AuthenticationService',
    NavController
  ]);

  function NavController($state, AuthenticationService) {
    var self = this;

    self.isInState = isInState;

    self.isLoggedIn = AuthenticationService.isLoggedIn;

    function isInState(state) {
      return $state.includes(state);
    }
  }

})();
