(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, $routeParams, WidgetService) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];

        vm.newWidget = function (type) {
            var result = WidgetService.createWidget(pageId, {
                widgetType: type
            });
            $location.url("/user/" + userId + "/website/" + websiteId + "/page/" + pageId
                + "/widget/" + result._id);
        };

        init();

        function init() {
            vm.currentUrl = "#!" + $location.url();
            vm.userId = userId;
        }
    }
})();