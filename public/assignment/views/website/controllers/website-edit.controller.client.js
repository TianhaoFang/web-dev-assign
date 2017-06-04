(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($location, $routeParams, $q, WebsiteService, UtilService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];
        var alertError = UtilService.alertError;

        vm.updateWebsite = function (item) {
            if (!checkValidInput(item)) {
                alert("input field should not be empty!");
                return;
            }
            WebsiteService.updateWebsite(websiteId, item).then(() => {
                $location.url(vm.baseUrl.replace("#!", ""));
            }).catch(alertError);
        };

        vm.deleteWebsite = function (websiteId) {
            if (!window.confirm("are you sure to delete this site?")) return;
            WebsiteService.deleteWebsite(websiteId).then(() => {
                $location.url(vm.baseUrl.replace("#!", ""));
            }).catch(alertError);
        };

        init();

        function init() {
            vm.userId = userId;
            vm.baseUrl = "#!/user/" + userId + "/website";
            vm.websiteId = websiteId;
            // vm.item = WebsiteService.findWebsiteById(websiteId);
            // vm.list = WebsiteService.findWebsitesByUser(userId);
            $q.all([
                WebsiteService.findWebsiteById(websiteId),
                WebsiteService.findWebsitesByUser(userId)
            ]).then(array => {
                vm.item = array[0];
                vm.list = array[1];
            }).catch(alertError);
        }

        function notEmpty(str) {
            return !!str && str.trim().length > 0;
        }

        function checkValidInput(item) {
            return notEmpty(item.name) && notEmpty(item.description);
        }
    }
})();