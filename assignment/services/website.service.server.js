module.exports = function (app) {
    // data in node.js
    let newId = 1001;
    let websites = [
        {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
        {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
    ];

    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsiteById);
    app.delete("/api/website/:websiteId", deleteWebsite);

    function createWebsite(req, res) {
        let userId = req.params.userId;
        let website = req.body;
        website._id = genId();
        website.developerId = userId;
        websites.push(website);
        res.json(website);
    }

    function findAllWebsitesForUser(req, res) {
        let userId = req.params.userId;
        res.json(websites.filter(function(elem){ return elem.developerId === userId; }));
    }

    function findWebsiteById(req, res){
        let websiteId = req.params.websiteId;
        sendNullableJson(res, websites.find(elem => elem._id === websiteId));
    }

    function updateWebsiteById(req, res){
        let websiteId = req.params.websiteId;
        let website = req.body;
        let oldValue = websites.find(elem => elem._id === websiteId);
        if(!oldValue) return sendNullableJson(res, null);
        Object.assign(oldValue, website, {_id: oldValue._id});
        sendNullableJson(res, oldValue);
    }

    function deleteWebsite(req, res){
        let websiteId = req.params.websiteId;
        for (let i = 0; i < websites.length; i++) {
            if (websites[i]._id === websiteId) {
                sendNullableJson(res, websites.splice(i, 1));
                return;
            }
        }
        sendNullableJson(res, null);
    }

    function genId() {
        return String(newId++);
    }

    function sendNullableJson(res, result) {
        if (result) {
            res.json(result);
        } else {
            res.status(404).json({error: "not find such user"});
        }
    }
};