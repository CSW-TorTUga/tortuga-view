(function() {

    angular.module('rms')
        .service('TimeoutService', [
            '$interval',
            'AuthenticationService',
            TimeoutService
        ]);

    function TimeoutService($interval, AuthenticationService) {
        var self = this;

        var CHECK_INTERVAL = 30000;

        self.somethingHappened = somethingHappened;

        var happened = false;
        var nothingHappenedCounter = 0;

        $interval(checkIfSomethingHappened, CHECK_INTERVAL);

        //public
        function somethingHappened() {
            happened = true;
        }

        function checkIfSomethingHappened() {
            if(happened) {
                happened = false;
                nothingHappenedCounter = 0;

                return;
            }

            console.log(AuthenticationService.getTokenValidityTime() / CHECK_INTERVAL);

            if(++nothingHappenedCounter > (AuthenticationService.getTokenValidityTime() / CHECK_INTERVAL - 1)) {
                AuthenticationService.logout();
            }
        }
    }

})();