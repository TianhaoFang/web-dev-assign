"use strict";

(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        // local page data
        var newId = 1001;
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];

        // private functions
        function genId() {
            return String(newId++);
        }

        return {
            createPage: function(websiteId, page){
                page = Object.assign({}, page);
                page._id = genId();
                page.websiteId = websiteId;
                pages.push(page);
            },
            findPageByWebsiteId: function(websiteId){
                return pages.filter(function(elem){ return elem.websiteId === websiteId; });
            },
            findPageById: function(pageId){
                return pages.find(function(elem){ return elem._id === pageId; });
            },
            updatePage: function(pageId, page){
                var oldPage = this.findPageById(pageId);
                Object.assign(page, {_id:oldPage._id});
                Object.assign(oldPage, page);
            },
            deletePage: function(pageId){
                for(var i = 0; i < pages.length; i++){
                    if(pages[i]._id === pageId){
                        pages.splice(i, 1);
                        return;
                    }
                }
            }
        };
    }
})();