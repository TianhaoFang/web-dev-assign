(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;

        vm.register = function(username, password, password2){
            if(password === password2 && password){
                var newUser = {
                    username: username,
                    password: password,
                    firstName: "",
                    lastName: ""
                };
                newUser = UserService.createUser(newUser);
                $location.url("/user/" + newUser._id);
            }else{
                vm.hasError = true;
            }
        };

        init();
        function init() {
            vm.username = "";
            vm.password = "";
            vm.password2 = "";
            vm.hasError = false;
            console.log(vm);
        }
    }
})();