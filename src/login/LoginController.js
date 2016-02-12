(function () {

    function getSearchParameters() {
        var prmstr = window.location.search.substr(1);
        return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
    }

    function transformToAssocArray( prmstr ) {
        var params = {};
        var prmarr = prmstr.split("&");
        for ( var i = 0; i < prmarr.length; i++) {
            var tmparr = prmarr[i].split("=");
            params[tmparr[0]] = tmparr[1];
        }
        return params;
    }

    var params = getSearchParameters();
    if(params.t != undefined) {
        var x = new XMLHttpRequest();
        x.open('PATCH', '/api/v1/terminal/door?token=' + params.t);
        x.setRequestHeader("Content-Type", "application/json");
        x.send('{"open":true}');
    }


    angular.module('login')
        .controller('LoginController', [
            'AuthenticationService',
            'ErrorToasts',
            '$state',
            '$animate',
            '$location',
            LoginController
        ]);

    function LoginController(AuthenticationService, ErrorToasts, $state, $animate, $location) {
        var self = this;

        self.username = '';
        self.password = '';
        self.longToken = false;

        self.login = login;
        self.isTerminal = isTerminal;

        if(AuthenticationService.isLoggedIn()) {
            //$state.go('home');
        }

        //public
        function login() {
            AuthenticationService.login(self.username, self.password, self.longToken)
                .then(function () {
                    $state.go('home');
                }).catch(function (response) {
                    if (response.status == 401) {
                        ErrorToasts.show("Benutzername und/oder Passwort sind falsch.", 3500, false);
                    }
                });
        }

        // public
        function isTerminal() {
            return $location.host().indexOf('192.168') != -1;
        }
    }

})();