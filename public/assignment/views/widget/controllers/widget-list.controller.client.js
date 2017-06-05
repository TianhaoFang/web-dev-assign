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

        vm.sortCallback = function (strList) {
            const diff = findDiffElement(vm.sequence, strList);
            console.log("diff", diff);
            console.log(vm.sequence);
            if(diff){
                const [start, end] = diff;
                vm.sequence.splice(end, 0, vm.sequence.splice(start, 1)[0]);
                console.log(vm.sequence);
            }
            vm.sequence = strList;
            console.log(vm.sequence);
        };

        init();

        function init() {
            vm.currentUrl = "#!" + $location.url();
            vm.userId = userId;
            vm.sequence = [];
            WidgetService.findWidgetsByPageId(pageId).then(list => {
                vm.list = list;
                vm.sequence = [];
                for(let i = 0; i < list.length; i++){
                    vm.sequence[i] = String(i);
                }
            });
        }

        function findDiffElement(prevList, newList) {
            let i = 0;
            let j = 0;
            for(; i < prevList.length && prevList[i] === newList[i]; i++){}
            for(j = i; j < prevList.length && prevList[j] !== newList[j]; j++){}
            j--;
            if(i >= prevList.length) return null;
            else if(prevList[i] === newList[j]) return [i, j];
            else return [j, i];
        }
    }
})();