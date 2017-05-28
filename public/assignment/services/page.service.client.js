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
            createPage(websiteId, page){
                page._id = genId();
                page.websiteId = websiteId;
                pages.push(page);
            },
            findPageByWebsiteId(websiteId){
                return pages.filter((elem) => elem.websiteId === websiteId);
            },
            findPageById(pageId){
                return pages.find((elem) => elem._id === pageId);
            },
            updatePage(pageId, page){
                var oldPage = this.findPageById(pageId);
                Object.assign(page, {_id:oldPage._id});
                Object.assign(oldPage, page);
            },
            deletePage(pageId){
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