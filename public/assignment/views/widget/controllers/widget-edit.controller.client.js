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
            WidgetService.updateWidget(widgetId, item).then(()=>{
                $location.url(parentUrl);
            });
        };

        vm.deleteItem = function (item) {
            WidgetService.deleteWidget(item._id).then(()=>{
                $location.url(parentUrl);
            });
        };

        vm.uploadImage = function () {
            let file = document.getElementById("upload").files[0];
            if(!file) return alert("please select a file");
            WidgetService.uploadImage(file).then(result => {
                vm.item.url = result.url;
                alert("upload success, press √ to submit");
            });
        };

        function init() {
            vm.currentUrl = "#!" + $location.url();
            vm.userId = userId;
            WidgetService.findWidgetById(widgetId).then(item => {
                vm.item = Object.assign({}, item);
            });
        }
    }
})();