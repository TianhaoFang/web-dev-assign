(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http, UtilService) {
        let parseData = UtilService.parseData;

        // the service definition
        return {
            createWebsite: function(userId, website){
                return $http.post("/api/user/" + userId + "/website", website).then(parseData);
            },
            findWebsitesByUser: function(userId){
                return $http.get("/api/user/" + userId + "/website").then(parseData);
            },
            findWebsiteById: function(websiteId){
                return $http.get("/api/website/" + websiteId).then(parseData);
            },
            updateWebsite: function(websiteId, website){
                return $http.put("/api/website/" + websiteId, website).then(parseData);
            },
            deleteWebsite: function(websiteId){
                return $http.delete("/api/website/" + websiteId).then(parseData);
            }
        };
    }
})();