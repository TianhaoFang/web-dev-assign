let multer = require("multer");

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

    // local widget data
    var widgets = [
        {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "444", "widgetType": "HTML", "pageId": "123", "text": "sdadasdadad"},
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    let newId = 1201;

    function genId() {
        return String(newId++);
    }

    function outputNotFind(res, widgetId) {
        res.status(404).json({"message": "could not find widget by id" + widgetId});
    }

    function createWidget(req, res) {
        const pageId = req.params.pageId;
        const widget = req.body;
        widget._id = genId();
        widget.pageId = pageId;
        widgets.push(widget);
        res.json(widget);
    }

    function findAllWidgetsForPage(req, res) {
        const pageId = req.params.pageId;
        res.json(widgets.filter(page => page.pageId === pageId));
    }

    function findWidgetById(req, res) {
        const widgetId = req.params.widgetId;
        const result = widgets.find(page => page._id === widgetId);
        if (!result) outputNotFind(res, widgetId);
        else res.json(result);
    }

    function updateWidget(req, res) {
        const widgetId = req.params.widgetId;
        const widget = req.body;
        widget._id = widgetId;
        let oldValue = widgets.find(page => page._id === widgetId);
        if (!oldValue) outputNotFind(res, widgetId);
        else {
            Object.assign(oldValue, widget);
            res.json(oldValue);
        }
    }

    function deleteWidget(req, res) {
        const widgetId = req.params.widgetId;
        for (let i = 0; i < widgets.length; i++) {
            if (widgets[i]._id === widgetId) {
                res.json(widgets.splice(i, 1));
                return;
            }
        }
        outputNotFind(res, widgetId);
    }

    function reorderWidget(req, res) {
        const pageId = req.params.pageId;
        const initial = parseInt(req.query.initial);
        const final = parseInt(req.query.final);
        if ((!initial && initial !== 0) || (!final && final !== 0)) {
            return res.status(400).json({message: "should have query: ?initial=num1&final=num2"});
        }

        const imageList = Array.from(widgets.entries()).filter(pair => pair[1].pageId === pageId);

        if (initial >= imageList.length || initial < 0) {
            return res.status(400).json({
                message: "initial=" + initial + " is out of boundary limit:" + imageList.length
            });
        }
        if (final >= imageList.length || final < 0) {
            return res.status(400).json({
                message: "final=" + final + " is out of boundary limit:" + imageList.length
            });
        }

        if (initial !== final) {
            swapArray(widgets, imageList[initial][0], imageList[final][0]);
            swapArray(imageList, initial, final);
        }

        res.json(imageList.map(pair => pair[1]));
    }

    // upload the file using the file reader to do that
    function uploadImage(req, res) {
        let myFile = req.file;
        res.json({
            file: myFile.filename,
            url: "/uploads/" + myFile.filename
        });
    }


    function swapArray(array, startId, endId) {
        array.splice(endId, 0, array.splice(startId, 1)[0]);
        return array;
    }
};