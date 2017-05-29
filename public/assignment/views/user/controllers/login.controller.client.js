(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", function ($location, UserService) {
            const vm = this;
            console.log("jump to LoginController");
            init();

            vm.login = function(username, password){
                var user = UserService.findUserByCredentials(username, password);
                console.log(vm);
                if(!user){
                    vm.hasError = true;
                }else{
                    $location.url("/user/" + user._id);
                }
            };
            
            function init() {
                vm.username = "asdad";
                vm.password = "xczcc";
                vm.hasError = false;
            }
        })
})();