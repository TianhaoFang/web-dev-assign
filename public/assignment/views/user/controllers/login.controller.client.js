(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", function ($location, UserService) {
            const vm = this;
            console.log("jump to LoginController");
            vm.login = function(username, password){
                console.log(UserService.findUserById(username));
            };

            init();
            
            function init() {
                vm.username = "";
                vm.password = "";
            }
        })
})();