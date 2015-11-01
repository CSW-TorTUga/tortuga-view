(function() {

  angular.module('rms')
    .controller('NavController', ['$state', NavController]);

  function NavController($state) {
    var self = this;

    self.isInState = isInState;

    function isInState(state) {
      return $state.includes(state);
    }
  }

})();
