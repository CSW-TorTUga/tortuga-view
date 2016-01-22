(function() {

    angular.module('tickets.support')
        .controller('SupportListController', [
            'SuppportMessage',
            '$mdDialog',
            'ErrorToasts',
            SupportListController
        ]);

    function SupportListController(SupportMessage, $mdDialog, ErrorToasts) {
        var self = this;

        self.messages = SuppportMessage.query({done: false});

        self.ignore = ignore;
        self.answer = answer;

        //public
        function ignore(message) {
            message.done = true;
            SupportMessage.update({id: message.id}, message).$promise
                .then(function() {
                    self.messages.splice(self.messages.indexOf(message), 1);
                })
                .catch(function(reason) {
                    ErrorToasts.show(reason);
                    if(reason != undefined) {
                        console.warn(reason);
                    }
                });
        }


        //public
        function answer(message) {
            message.done = true;

            $mdDialog.show({
                clickOutsideToClose: true,
                templateUrl: 'src/management/users/details.html',
                controller: ['$mdDialog', AnswerController],
                controllerAs: 'answerModal',
                targetEvent: event,
                bindToController: true
            });

            function AnswerController($mdDialog) {
                var self = this;

                self.submit = submit;
                self.cancel = cancel;


                //public
                function cancel() {
                    $mdDialog.cancel();
                }

                //public
                function submit() {

                    SupportMessage.update({id: message.id}, message).$promise
                        .then(function() {
                            self.messages.splice(self.messages.indexOf(message), 1);
                            $mdDialog.submit();
                        })
                        .catch(function(reason) {
                            ErrorToasts.show(reason);
                            if(reason != undefined) {
                                console.warn(reason);
                            }
                        });
                }
            }

        }


    }

})();