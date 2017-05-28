(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", function ($location, UserService) {
            const vm = this;
            console.log("jump to LoginController");
            Object.assign(vm, {
                username: "",
                password: "",
                login(username, password){
                    console.log(UserService.findUserById(username));
                }
            });
        })
})();