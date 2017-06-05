(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http, UtilService, $q) {
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
            },
            uploadImage: function (file) {
                let formData = new FormData();
                formData.append("myFile", file);
                return $q((resolve, reject) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open("POST", "/api/upload", true);
                    xhr.onreadystatechange = function () {
                        if(xhr.readyState !== 4) return;
                        if(xhr.status === 200){
                            resolve(JSON.parse(xhr.responseText));
                        }else{
                            reject(JSON.parse(xhr.responseText));
                        }
                    };
                    xhr.send(formData);
                });
            }
        };
    }
})();