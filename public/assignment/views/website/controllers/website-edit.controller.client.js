(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($location, $routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        vm.updateWebsite = function (item) {
            if(!checkValidInput(item)){
                alert("input field should not be empty!");
                return;
            }
            WebsiteService.updateWebsite(websiteId, item);
            $location.url(vm.baseUrl.replace("#!", ""));
        };

        vm.deleteWebsite = function (websiteId) {
            if(!window.confirm("are you sure to delete this site?")) return;
            WebsiteService.deleteWebsite(websiteId);
            $location.url(vm.baseUrl.replace("#!", ""));
        };

        init();

        function init() {
            vm.userId = userId;
            vm.baseUrl = "#!/user/" + userId + "/website";
            vm.websiteId = websiteId;
            vm.item = WebsiteService.findWebsiteById(websiteId);
            vm.list = WebsiteService.findWebsitesByUser(userId);
        }

        function notEmpty(str){
            return !!str && str.trim().length > 0;
        }

        function checkValidInput(item) {
            return notEmpty(item.name) && notEmpty(item.description);
        }
    }
})();