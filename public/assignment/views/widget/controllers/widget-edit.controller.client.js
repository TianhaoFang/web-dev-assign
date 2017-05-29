(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController(WidgetService, $routeParams, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];
        var parentUrl = "/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";

        init();

        vm.submit = function (item) {
            WidgetService.updateWidget(widgetId, item);
            $location.url(parentUrl);
        };

        vm.deleteItem = function (item) {
            WidgetService.deleteWidget(item._id);
            $location.url(parentUrl);
        };

        function init() {
            vm.item = WidgetService.findWidgetById(widgetId);
            vm.item = Object.assign({}, vm.item);
            vm.currentUrl = "#!" + $location.url();
            vm.userId = userId;
        }
    }
})();