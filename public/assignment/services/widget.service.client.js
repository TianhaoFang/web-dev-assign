(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        // local widget data
        var widgets = [
            {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"
            },
            {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            {
                "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E"
            },
            {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var newId = 1201;

        function genId(){
            return String(newId++);
        }

        return {
            createWidget: function(pageId, widget){
                widget = Object.assign({}, widget);
                widget._id = genId();
                widget.pageId = pageId;
                widgets.push(widget);
                return widget;
            },
            findWidgetsByPageId: function(pageId){
                return widgets.filter(function(page){ return page.pageId === pageId; });
            },
            findWidgetById: function(widgetId){
                return widgets.find(function(page){ return page._id === widgetId; });
            },
            updateWidget: function(widgetId, widget){
                widget._id = widgetId;
                var oldValue = this.findWidgetById(widgetId);
                Object.assign(oldValue, widget);
            },
            deleteWidget: function(widgetId){
                for(var i = 0; i < widgets.length; i++){
                    if(widgets[i]._id === widgetId){
                        widgets.splice(i, 1);
                        return;
                    }
                }
            }
        };
    }
})();