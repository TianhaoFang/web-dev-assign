(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", function () {
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

            // the service definition
            return {
                createWebsite(userId, website){
                    website._id = String(newId);
                    website.developerId = userId;
                    websites.push(website);
                    newId++;
                },
                findWebsitesByUser(userId){
                    return websites.filter((elem) => elem.developerId === userId);
                },
                findWebsiteById(websiteId){
                    return websites.find((elem) => elem._id === websiteId);
                },
                updateWebsite(websiteId, website){
                    var oldValue = checkExist(findWebsiteById(websiteId), websiteId);
                    Object.assign(oldValue, website, {_id:oldValue._id});
                    return oldValue;
                },
                deleteWebsite(websiteId){
                    for(var i = 0; i < websites.length; i++){
                        if(websites[i]._id === websiteId){
                            websites.splice(i, 1);
                            return;
                        }
                    }
                    checkExist(null, websiteId);
                }
            };

            function checkExist(website, idOrName) {
                if(!website) throw new Error("not find website with id/userId " + idOrName);
                else return website;
            }
        });
})();