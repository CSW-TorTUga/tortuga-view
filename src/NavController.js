(function() {

  angular.module('rms')
  .controller('NavController', [
    '$state',
    'AuthenticationService',
    NavController
  ]);

  function NavController($state, UserService) {
    var self = this;

    self.isInState = isInState;

    self.isLoggedIn = UserService.isLoggedIn;

    function isInState(state) {
      return $state.includes(state);
    }
  }

})();
