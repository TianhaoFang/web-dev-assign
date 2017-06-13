(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetFlickrSearchController", WidgetFlickrSearchController);

    function WidgetFlickrSearchController($location, $routeParams, FlickrService, WidgetService) {
        var vm = this;
        var userId = $routeParams['uid'];
        var websiteId = $routeParams['wid'];
        var pageId = $routeParams['pid'];
        var widgetId = $routeParams['wgid'];
        init();

        vm.searchPhotos = function (text) {
            if(!text) return;
            FlickrService.searchPhotos(text).then(data => {
                vm.photos = data.photos;
            });
        };

        vm.generateUrl = function (photo) {
            return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/"
                + photo.id + "_" + photo.secret + "_s.jpg";
        };

        vm.selectPhoto = function (photo) {
            const url = vm.generateUrl(photo);
            return WidgetService.updateWidget(widgetId, {
                url: url
            }).then(() => {
                $location.url($location.url().replace("/flickr", ""));
            });
        };

        function init() {
            vm.currentUrl = "#!" + $location.url();
            vm.userId = userId;
        }
    }
})();