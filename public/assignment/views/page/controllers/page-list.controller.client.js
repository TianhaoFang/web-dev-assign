(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, $location, PageService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        
        init();
        
        function init() {
            vm.parentUrl = "#!/user/" + userId + "/website/" + websiteId;
            vm.currentUrl = vm.parentUrl + "/page";
            vm.userId = userId;

            PageService.findPageByWebsiteId(websiteId).then(list => {
                vm.list = list;
            });
        }
    }
})();