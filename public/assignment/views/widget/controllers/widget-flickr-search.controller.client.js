(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetFlickrSearchController", WidgetFlickrSearchController);

    function WidgetFlickrSearchController($location, $routeParams) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];
        init();

        function init() {
            vm.currentUrl = "#!" + $location.url();
            vm.userId = userId;
        }
    }
})();