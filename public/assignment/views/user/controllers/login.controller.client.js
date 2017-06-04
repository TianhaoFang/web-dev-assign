(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", function ($location, UserService) {
            const vm = this;
            init();

            vm.login = function (username, password) {
                console.log("start login");
                UserService.findUserByCredentials(username, password).then((user) => {
                    console.log("finish login with right user");
                    $location.url("/user/" + user._id);
                }).catch((response) => vm.hasError = true);
            };

            function init() {
                vm.username = "asdad";
                vm.password = "xczcc";
                vm.hasError = false;
            }
        })
})();