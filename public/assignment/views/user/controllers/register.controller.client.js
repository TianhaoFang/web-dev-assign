(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location, UtilService) {
        var vm = this;

        vm.register = function (username, password, password2) {
            UtilService.catchWithAlert(() => {
                    if (password === password2 && password) {
                        let newUser = {
                            username: username,
                            password: password,
                            firstName: "",
                            lastName: ""
                        };
                        UserService.createUser(newUser).then((user) => {
                            $location.url("/user/" + newUser._id);
                        });
                    } else {
                        vm.hasError = true;
                    }
                }
            )
        };

        init();
        function init() {
            vm.username = "";
            vm.password = "";
            vm.password2 = "";
            vm.hasError = false;
        }
    }
})();