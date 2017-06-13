const Website = require("./../model/website.model.server");

module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsiteById);
    app.delete("/api/website/:websiteId", deleteWebsite);

    async function createWebsite(req, res) {
        let userId = req.params.userId;
        let website = req.body;
        sendNullableJson(res, await Website.createWebsiteForUser(userId, website));
    }

    async function findAllWebsitesForUser(req, res) {
        let userId = req.params.userId;
        res.json(await Website.findAllWebsitesForUser(userId));
    }

    async function findWebsiteById(req, res){
        let websiteId = req.params.websiteId;
        sendNullableJson(res, await Website.findWebsiteById(websiteId));
    }

    async function updateWebsiteById(req, res){
        let websiteId = req.params.websiteId;
        let website = req.body;
        sendNullableJson(res, await Website.updateWebsite(websiteId, website));
    }

    async function deleteWebsite(req, res){
        let websiteId = req.params.websiteId;
        sendNullableJson(res, await Website.deleteWebsite(websiteId));
    }

    function sendNullableJson(res, result) {
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({message: "not find such user or website"});
        }
    }
};