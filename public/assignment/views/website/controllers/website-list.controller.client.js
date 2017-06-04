(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService, UtilService) {
        var vm = this;
        var userId = $routeParams["uid"];

        init();

        function init() {
            vm.userId = userId;
            vm.baseUrl = "#!/user/" + userId;
            WebsiteService.findWebsitesByUser(userId).then(list => {
                vm.list = list;
            }).catch(UtilService.alertError);
        }
    }
})();