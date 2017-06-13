const Page = require("./../model/page.model.server");

module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    // private functions
    function sendNullable(res, pageId, result) {
        if(result) res.json(result);
        else genNotFind(res, pageId);
    }

    function genNotFind(res, pageId) {
        res.status(404).json({message: "not find page with id:" + pageId});
    }

    async function createPage(req, res){
        const websiteId = req.params.websiteId;
        const page = req.body;
        const newPage = await Page.createPage(websiteId, page);
        if(!newPage) res.status(404).json({
            message: "the websiteId:" + websiteId + " is not found"
        });
        res.json(newPage);
    }

    async function findAllPagesForWebsite(req, res){
        const websiteId = req.params.websiteId;
        res.json(await Page.findAllPagesForWebsite(websiteId));
    }

    async function findPageById(req, res){
        const pageId = req.params.pageId;
        sendNullable(res, pageId, await Page.findPageById(pageId));
    }

    async function updatePage(req, res){
        const pageId = req.params.pageId;
        const page = req.body;
        sendNullable(res, pageId, await Page.updatePage(pageId, page));
    }

    async function deletePage(req, res){
        const pageId = req.params.pageId;
        sendNullable(res, pageId, await Page.deletePage(pageId))
    }
};