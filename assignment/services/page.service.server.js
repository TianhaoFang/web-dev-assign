module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    let newId = 1001;
    let pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    // private functions
    function genId() {
        return String(newId++);
    }

    function genNotFind(res, pageId) {
        res.status(404).json({message: "not find page with id:" + pageId});
    }

    function createPage(req, res){
        const websiteId = req.params.websiteId;
        const page = req.body;
        page._id = genId();
        page.websiteId = websiteId;
        pages.push(page);
        res.json(page);
    }

    function findAllPagesForWebsite(req, res){
        const websiteId = req.params.websiteId;
        res.json(pages.filter(elem => elem.websiteId === websiteId));
    }

    function findPageById(req, res){
        const pageId = req.params.pageId;
        const result = pages.find(elem => elem._id === pageId);
        if(!result) genNotFind(res, pageId);
    }

    function updatePage(req, res){
        const pageId = req.params.pageId;
        const page = req.body;
        const oldPage = pages.find(elem => elem._id === pageId);
        if(!oldPage) return genNotFind(res, pageId);
        page._id = oldPage._id;
        Object.assign(oldPage, page);
        res.json(oldPage);
    }

    function deletePage(req, res){
        const pageId = req.params.pageId;
        for(let i = 0; i < pages.length; i++){
            if(pages[i]._id === pageId){
                return res.json(pages.splice(i, 1));
            }
        }
        genNotFind(res, pageId);
    }
};