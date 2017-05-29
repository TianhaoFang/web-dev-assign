(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, $routeParams, PageService) {
        var vm = this;
        var userId = $routeParams["uid"];
        var websiteId = $routeParams["wid"];

        vm.newPage = function (item) {
            if(!checkValidInput(item)){
                alert("none of the input field should be empty");
                return;
            }
            PageService.createPage(websiteId, item);
            $location.url(vm.currentUrl.replace("#!", ""));
        };

        init();

        function init() {
            vm.parentUrl = "#!/user/" + userId + "/website/" + websiteId;
            vm.currentUrl = vm.parentUrl + "/page";
            vm.userId = userId;

            vm.item = {
                name: "",
                websiteId: websiteId,
                description: ""
            }
        }

        function notEmpty(str){
            return !!str && str.trim().length > 0;
        }

        function checkValidInput(item) {
            return notEmpty(item.name) && notEmpty(item.description);
        }
    }
})();