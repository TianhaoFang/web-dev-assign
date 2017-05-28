(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", function ($location) {
            var vm = this;
            console.log("jump to LoginController");
            vm.username = "";
            vm.password = "";
            vm.login = function (user, password) {
                alert("user:" + user + " password:" + password);
            };
        })
})();