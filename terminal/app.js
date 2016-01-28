(function() {

    var PRIMARY = 'blue-grey';
    var ACCENT = 'orange';

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    angular.module('rms-terminal', [
        'ngResource'
    ]);


    angular.module('rms-terminal')
        .constant('apiAddress', '/api/v1/');

    angular.module('rms-terminal')
        .controller('LoginController', [
            '$http',
            'apiAddress',
            '$timeout',
            '$interval',
            'ComplaintTemplate',
            '$rootScope',
            '$window',
            LoginController
        ]);

    function LoginController($http, apiAddress, $timeout, $interval, ComplaintTemplate, $scope, $window) {
        var self = this;
        self.twemoji = twemoji;

        var password = ["", "", "", "", ""];
        var passwordIndex = 0;

        var emojisArray = ["😈", "😃", "🎩", "👽", "💩", "❤️", "💧", "💎", "👂", "👍", "🐋", "🐶", "🐸", "🌜", "❄", "🎉", "💿",
            "🍉", "🍆", "☎", "🎥", "🚽", "✂", "⚽", "🚀", "😍", "💄", "🌂", "🍄", "🍀", "🚗", "🍕", "🍔", "🍨", "💣",
            "🎸", "🐧", "💼", "🌍", "🐝", "🏠", "⏰"];


        var emojis = [];

        var passwordShow = [0,0,0,0,0];
        var backButtonStatus = 0;

        var success = false;
        var error = false;
        var successStartTime = 0;

        self.getEmojis = getEmojis;
        self.getPassword = getPassword;
        self.addKey = addKey;
        self.inNormalState = inNormalState;
        self.inSuccesState = inSuccesState;
        self.inErrorState = inErrorState;
        self.getPasswordShow = getPasswordShow;
        self.deletePin = deletePin;
        self.getBackButtonStatus = getBackButtonStatus;

        resetPin();
        generatePasswordField();

        function getPassword() {
            return password;
        }

        function addKey(emoji) {
            if(!inNormalState()) {
                resetPin();
            }
            if(passwordIndex >= 5) {
                return;
            }
            password[passwordIndex] = emoji;
            passwordShow[passwordIndex] = 1;
            passwordIndex++;
            if(passwordIndex == 5) {
                login();
            }
        }


        //public
        function getPasswordShow() {
            return passwordShow;
        }

        //public
        function deletePin() {
            if(passwordIndex <= 0) {
                return;
            }
            passwordIndex--;
            password[passwordIndex] = "";
            passwordShow[passwordIndex] = 0;
        }

        //public
        function getBackButtonStatus() {
            return backButtonStatus;
        }


        function updatePinState() {
            if(inErrorState()) {
                passwordShow = [4,4,4,4,4];
                backButtonStatus = 2;
                $timeout(resetPin, 700);
            } else if(inSuccesState()) {
                var timeBetweenAnim = 100;

                function updatePin(pin, number) {
                    return function() {
                        passwordShow[pin] = number;
                    }
                }

                for(var i = 0; i <= 4; i++ ) {
                    $timeout(updatePin(i,2), (i + 1) * timeBetweenAnim);
                }

                $timeout(function() {
                    backButtonStatus = 1;
                }, 6 * timeBetweenAnim);

                $timeout(function() {
                    resetPin();
                    generatePasswordField();
                    $scope.$apply();

                }, 10 * timeBetweenAnim);
            }

        }


        function shufle(array) {
            for(var i = 0; i < array.length; i++) {
                var j = parseInt((Math.random() * (array.length - i))) + i;
                tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
            return array;
        }

        function generatePasswordField() {
            shufle(emojisArray);
            emojis = [];
            for(var i = 0; i < emojisArray.length; i++) {
                if(i % 7 == 0) {
                    emojis.push([]);
                }
                var t = parseInt(i / 7);
                emojis[t].push(emojisArray[i]);
            }
        }

        //public
        function getEmojis() {
            return emojis;
        }

        //public
        function resetPin() {
            password = ["", "", "", "", ""];
            passwordShow = [0,0,0,0,0];
            success = false;
            error = false;
            passwordIndex = 0;
            backButtonStatus = 0;
        }

        //public
        function inNormalState() {
            return !success && !error;
        }

        //public
        function inErrorState() {
            return error;
        }

        //public
        function inSuccesState() {
            return success;
        }

        function login() {
            var passwordString = password.join("");
            $http.post(apiAddress + "terminal/authenticate", {passcode: passwordString})
                .then(function() {
                    success = true;
                    successStartTime = (new Date()).valueOf();
                    updatePinState();
                }).catch(function() {
                error = true;
                updatePinState();
            });
        }
    }


    angular.module('rms-terminal')
        .factory('ComplaintTemplate', [
            '$resource',
            'apiAddress',
            ComplaintTemplate
        ]);

    function ComplaintTemplate($resource, apiAddress) {
        return $resource(apiAddress + 'complainttemplates/:id', null, {update: {method: 'PATCH'}});
    }

    angular.module('rms-terminal')
        .directive('twemoji', ['$window', function($window) {
            return {
                restrict: 'E',
                scope: {
                    emoji: "="
                },
                link: function(scope, elem, attr) {
                    //console.dir(elem);

                    var img = elem.append($window.twemoji.parse(scope.emoji));

                    scope.$watch(attr.emoji, function(newVal) {
                        img.children().remove();
                        elem.html("");
                        img = elem.append($window.twemoji.parse(newVal));
                    })
                }
            };
        }]);


})
();
