(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http, UtilService) {
        const parseData = UtilService.parseData;

        return {
            createWidget: function (pageId, widget) {
                return $http.post("/api/page/" + pageId + "/widget", widget).then(parseData);
            },
            findWidgetsByPageId: function (pageId) {
                return $http.get("/api/page/" + pageId + "/widget").then(parseData);
            },
            findWidgetById: function (widgetId) {
                return $http.get("/api/widget/" + widgetId).then(parseData);
            },
            updateWidget: function (widgetId, widget) {
                return $http.put("/api/widget/" + widgetId, widget).then(parseData);
            },
            deleteWidget: function (widgetId) {
                return $http.delete("/api/widget/" + widgetId).then(parseData);
            },
            reorderWidget: function (pageId, initialId, finalId) {
                return $http.put("/api/page/" + pageId + "/widget?initial=" + initialId + "&final=" + finalId)
                    .then(parseData);
            }
        };
    }
})();