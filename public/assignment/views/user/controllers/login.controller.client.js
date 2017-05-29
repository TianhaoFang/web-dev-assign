(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", function ($location, UserService) {
            const vm = this;
            console.log("jump to LoginController");
            vm.login = function(username, password){
                var user = UserService.findUserByCredentials(username, password);
                if(!user){
                    vm.alert("could not login with current username and password");
                }else{
                    $location.url("/user/" + user._id);
                }
            };

            init();
            
            function init() {
                vm.username = "";
                vm.password = "";
            }
        })
})();