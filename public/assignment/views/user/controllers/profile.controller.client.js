(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
        var userId = $routeParams["uid"];
        init();

        vm.update = function (username, email, firstName, lastName) {
            var newUser = {
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            UserService.updateUser(userId, newUser);
            alert("update success");
            console.log(UserService);
        };

        function init() {
            var user = UserService.findUserById(userId);
            if(!user){
                alert("could not find user in id" + userId);
                $location.url("/login");
            }
            Object.assign(vm, user);
            vm.websiteLink = "#!/user/" + userId + "/website";
        }
    }
})();