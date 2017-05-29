(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService, $sce, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];

        vm.getYoutubeLink = function (originLink) {
            originLink = originLink.replace("http://", "https://");
            originLink = originLink.replace("youtu.be/", "www.youtube.com/embed/");
            console.log(originLink);
            return $sce.trustAsResourceUrl(originLink);
        };

        init();

        function init() {
            vm.list = WidgetService.findWidgetsByPageId(pageId);
            vm.currentUrl = "#!" + $location.url();
            vm.userId = userId;
        }
    }
})();