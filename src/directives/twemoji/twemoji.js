(function() {
    angular.module('rms')
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

})();