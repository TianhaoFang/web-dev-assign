(function () {
    angular
        .module("wbdvDirectives", []);

    angular
        .module("wbdvDirectives")
        .directive("wbdvSortable", wbdvSortable);

    function wbdvSortable() {
        return {
            restrict: "A",
            scope: {
                sortCallback: "&"
            },
            link: function (scope, element, attrs) {
                const selected = $(element);
                const sortAttr = attrs.wbdvSortable;
                let sortCallback = scope.sortCallback;

                selected.sortable({
                    stop: function (event, ui) {
                        const list = selected.sortable("toArray", {
                            attribute: "sort-id"
                        });
                        sortCallback()(list);
                    }
                });
            }
        };
    }
})();