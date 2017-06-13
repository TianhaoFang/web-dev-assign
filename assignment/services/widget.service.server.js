let multer = require("multer");
const Widget = require("./../model/widget.model.server");

module.exports = function (app) {
    let upload = multer({
        dest: __dirname + "/../../public/uploads"
    });

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/api/page/:pageId/widget", reorderWidget);
    app.post("/api/upload", upload.single("myFile"), uploadImage);

    function outputNotFind(res, widgetId) {
        res.status(404).json({"message": "could not find widget by id" + widgetId});
    }

    function sentNullable(res, widgetId, result) {
        if(result) res.json(result);
        else outputNotFind(res, widgetId);
    }

    async function createWidget(req, res) {
        const pageId = req.params.pageId;
        const widget = req.body;
        const result = await Widget.createWidget(pageId, widget);
        if(!result) res.status(404).json({
            message: "could not find pageId:" + pageId
        });
        res.json(result);
    }

    async function findAllWidgetsForPage(req, res) {
        const pageId = req.params.pageId;
        res.json(await Widget.findAllWidgetsForPage(pageId));
    }

    async function findWidgetById(req, res) {
        const widgetId = req.params.widgetId;
        sentNullable(res, widgetId, await Widget.findWidgetById(widgetId));
    }

    async function updateWidget(req, res) {
        const widgetId = req.params.widgetId;
        const widget = req.body;
        sentNullable(res, widgetId, await Widget.updateWidget(widgetId, widget));
    }

    async function deleteWidget(req, res) {
        const widgetId = req.params.widgetId;
        sentNullable(res, widgetId, await Widget.deleteWidget(widgetId));
    }

    async function reorderWidget(req, res) {
        const pageId = req.params.pageId;
        const initial = parseInt(req.query.initial);
        const final = parseInt(req.query.final);
        if ((!initial && initial !== 0) || (!final && final !== 0)) {
            return res.status(400).json({message: "should have query params initial and final with both int"});
        }
        const result = await Widget.reorderWidget(pageId, initial, final);
        result
            .onNotFound(x => res.status(404).json({message: "could not find pageId:" + pageId}))
            .onOutBoundary(({name, limit, fact}) => {
                res.status(400).json({
                    message: "the " + name + ":" + fact + " is out of boundary [0, " + limit + ")"
                })
            })
            .onSuccess(r => res.json(r))
    }

    // upload the file using the file reader to do that
    function uploadImage(req, res) {
        let myFile = req.file;
        res.json({
            file: myFile.filename,
            url: "/uploads/" + myFile.filename
        });
    }
};