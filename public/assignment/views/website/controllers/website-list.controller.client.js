(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams["uid"];

        init();

        function init() {
            vm.list = WebsiteService.findWebsitesByUser(userId);
            vm.userId = userId;
            vm.baseUrl = "#!/user/" + userId;
        }
    }
})();