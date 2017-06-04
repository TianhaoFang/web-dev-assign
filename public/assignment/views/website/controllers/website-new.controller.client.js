(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($location, $routeParams, WebsiteService, UtilService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var alertError = UtilService.alertError;

        init();

        vm.createItem = function (item) {
            if(!checkInputValid(item)){
                alert("name or description should not be empty!");
                return;
            }
            WebsiteService.createWebsite(userId, item).then(() => {
                alert("success in create new website");
                $location.url(vm.baseUrl.replace("#!", ""));
            }).catch(alertError);
        };

        function init() {
            vm.userId = userId;
            vm.baseUrl = "#!/user/" + userId + "/website";
            vm.newItem = {
                name: "",
                description: ""
            };
            WebsiteService.findWebsitesByUser(userId)
                .then(list => vm.list = list)
                .catch(alertError);
        }

        function checkInputValid(item){
            return !!item.name && !!item.description;
        }
    }
})();