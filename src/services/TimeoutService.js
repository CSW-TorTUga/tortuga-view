(function() {

    angular.module('rms')
        .service('TimeoutService', [
            '$interval',
            'AuthenticationService',
            TimeoutService
        ]);

    function TimeoutService($interval, AuthenticationService) {
        var self = this;

        self.somethingHappened = somethingHappened;

        var happened = false;
        var nothingHappenedCounter = 0;

        $interval(checkIfSomethingHappened, 30000);

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

            if(++nothingHappenedCounter > 5) {
                AuthenticationService.logout();
            }
        }
    }

})();