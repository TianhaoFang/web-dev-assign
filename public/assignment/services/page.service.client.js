"use strict";

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http, UtilService) {
        const parseData = UtilService.parseData;

        return {
            createPage: function(websiteId, page){
                return $http.post("/api/website/" + websiteId + "/page", page).then(parseData);
            },
            findPageByWebsiteId: function(websiteId){
                return $http.get("/api/website/" + websiteId + "/page").then(parseData);
            },
            findPageById: function(pageId){
                return $http.get("/api/page/" + pageId).then(parseData);
            },
            updatePage: function(pageId, page){
                return $http.put("/api/page/" + pageId, page).then(parseData);
            },
            deletePage: function(pageId){
                return $http.delete("/api/page/" + pageId).then(parseData);
            }
        };
    }
})();