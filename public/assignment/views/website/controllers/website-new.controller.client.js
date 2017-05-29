(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        init();

        vm.createItem = function (item) {
            if(!checkInputValid(item)){
                alert("name or description should not be empty!");
                return;
            }
            WebsiteService.createWebsite(userId, item);
            alert("success in create new website");
            $location.url(vm.baseUrl.replace("#!", ""));
        };

        function init() {
            vm.userId = userId;
            vm.baseUrl = "#!/user/" + userId + "/website";
            vm.list = WebsiteService.findWebsitesByUser(userId);
            vm.newItem = {
                name: "",
                description: ""
            }
        }

        function checkInputValid(item){
            return !!item.name && !!item.description;
        }
    }
})();