(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);
    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var parent = "/user/" + userId + "/website/" + websiteId + "/page/";

        vm.updatePage = function (item) {
            if(!checkValidInput(item)){
                alert("name/description should not be empty!");
                return;
            }
            PageService.updatePage(pageId, item);
            $location.url(parent);
        };

        vm.deletePage = function (item) {
            if(!window.confirm("are you sure to delete this page?")) return;
            PageService.deletePage(item._id);
            $location.url(parent);
        };

        init();

        function init() {
            vm.item = Object.assign({}, PageService.findPageById(pageId));
            vm.currentUrl = "#!" + $location.url();
            vm.userId = userId;
        }

        function notEmpty(str){
            return !!str && str.trim().length > 0;
        }

        function checkValidInput(item) {
            return notEmpty(item.name) && notEmpty(item.description);
        }
    }
})();