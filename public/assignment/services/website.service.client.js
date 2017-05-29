(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService() {
        // local website data
        var newId = 1001;
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];

        function checkExist(website, idOrName) {
            if (!website) throw new Error("not find website with id/userId " + idOrName);
            else return website;
        }

        function genId() {
            return String(newId++);
        }

        // the service definition
        return {
            createWebsite: function(userId, website){
                website = Object.assign({}, website);
                website._id = genId();
                website.developerId = userId;
                websites.push(website);
                return website;
            },
            findWebsitesByUser: function(userId){
                return websites.filter(function(elem){ return elem.developerId === userId; });
            },
            findWebsiteById: function(websiteId){
                return websites.find(function(elem){ return elem._id === websiteId; });
            },
            updateWebsite: function(websiteId, website){
                var oldValue = checkExist(this.findWebsiteById(websiteId), websiteId);
                Object.assign(oldValue, website, {_id: oldValue._id});
                return oldValue;
            },
            deleteWebsite: function(websiteId){
                for (var i = 0; i < websites.length; i++) {
                    if (websites[i]._id === websiteId) {
                        websites.splice(i, 1);
                        return;
                    }
                }
                checkExist(null, websiteId);
            }
        };
    }
})();