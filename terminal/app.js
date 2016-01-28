(function() {

    var PRIMARY = 'blue-grey';
    var ACCENT = 'orange';

    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    angular.module('rms-terminal', [
        'sc.twemoji'
    ]);


    angular.module('rms-terminal')
        .constant('apiAddress', '/api/v1/terminal/');

    angular.module('rms-terminal')
        .controller('LoginController', [
            'twemoji',
            '$http',
            'apiAddress',
            '$timeout',
            '$interval',
            LoginController
        ]);

    function LoginController(twemoji, $http, apiAddress, $timeout, $interval) {
        var self = this;
        self.twemoji = twemoji;

        var password = ["", "", "", "", ""];
        var passwordIndex = 0;

        var emojisArray = ["😈", "😃", "🎩", "👽", "💩", "❤️", "💧", "💎", "🖖", "👍", "🐋", "🐶", "🐸", "🌜", "❄", "🎉", "💿",
            "🍉", "🍆", "☎", "🎥", "🚽", "✂", "⚽", "🚀", "😍", "💄", "🌂", "🍄", "🍀", "🚗", "🍕", "🍔", "🍨", "💣",
            "🎸", "🐧", "💼", "🌍", "🐝", "🏠", "🤖"];

        var emojis = [];

        var success = false;
        var error = false;

        self.getEmojis = getEmojis;
        self.getPassword = getPassword;
        self.addKey = addKey;
        self.inNormalState = inNormalState;
        self.inSuccesState = inSuccesState;
        self.inErrorState = inErrorState;
        self.getPinState = getPinState;

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
            passwordIndex++;
            if(passwordIndex == 5) {
                login();
            }

        }

        //public
        function getPinState(pin, index) {
            if(inNormalState()) {
                if(pin == "") {
                    return 0;
                } else {
                    return 1;
                }
            } else if(inSuccesState()) {
                if(index < 4) {
                    return 2;
                } else {
                    return 4;
                }
            } else {
                return 3;
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
            window.twemoji.parse(window.document.body);
            return emojis;
        }

        //public
        function resetPin() {
            password = ["", "", "", "", ""];
            success = false;
            error = false;
            passwordIndex = 0;
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
        function inSuccesState(){
            return success;
        }

        function login() {
            var passwordString = password.join("");
            $http.post(apiAddress + "authenticate", {passcode: passwordString})
                .then(function() {
                    success = true;
                    $timeout(resetPin, 1000);
                    $timeout(function() {
                        generatePasswordField()}, 1000);
                }).catch(function() {
                    error = true;
                     $timeout(resetPin, 700);
                });

        }
    }

})();
