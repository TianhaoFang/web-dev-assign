(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, UtilService) {
        var vm = this;
        var userId = $routeParams["uid"];
        init();

        const defaultCatch = UtilService.catchWithAlert;

        vm.update = function (username, email, firstName, lastName) {
            defaultCatch(() => {
                    let newUser = {
                        username: username,
                        email: email,
                        firstName: firstName,
                        lastName: lastName
                    };
                    return UserService.updateUser(userId, newUser).then(
                        () => alert("update success")
                    );
                }
            );
        };

        vm.deleteUser = function (id) {
            function common() {
                $location.url("/login");
            }
            if(!confirm("delete current user? all the website and pages will deleted!")) return;
            return UserService.deleteUser(id).then(common, common);
        };

        function init() {
            UserService.findUserById(userId).then((user) => {
                if (!user) throw 4;
                Object.assign(vm, user);
                vm.websiteLink = "#!/user/" + userId + "/website";
            }).catch(() => {
                alert("could not find user in id" + userId);
                $location.url("/login");
            });
        }
    }
})();