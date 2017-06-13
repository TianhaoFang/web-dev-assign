const mongoose = require("mongoose");

const Widget = mongoose.model("Widget", require("./widget.schema.server"));
module.exports = Widget;

const Page = require("./page.model.server");

Widget.createWidget = async function (pageId, widget) {
    let page = await Page.findPageById(pageId);
    if(!page) return null;
    widget = toPojo(widget);
    widget._page = page._id;
    delete widget.dateCreated;
    const instance = await Widget.create(widget);
    page.widgets.push(instance._id);
    await page.save();
    return instance;
};

Widget.findAllWidgetsForPage = async function (pageId) {
    let page = await Page.findPageById(pageId);
    if(!page) return [];
    page = await page.populate("widgets");
    return page.widgets;
};

Widget.findWidgetById = async function(widgetId) {
    if(!validId(widgetId)) return null;
    return await this.findById(widgetId).exec();
};

Widget.updateWidget = function(widgetId, widget) {
    widget = toPojo(widget);
    delete widget._page;
    delete widget._id;
    delete widget.dateCreated;
    return this.findByIdAndUpdate(widgetId, widget, {new: true}).exec();
};

Widget.deleteWidget = async function(widgetId) {
    const widget = await this.findWidgetById(widgetId);
    if(!widget) return null;
    await Promise.all([
        this.deleteOne({_id: widget._id}),
        Page.update({_id: widget._page}, {$pull: {widgets: widget._id}})
    ]);
    return widget;
};

Widget.reorderWidget = async function (pageId, start, end) {
    let page = await Page.findPageById(pageId);
    if(!page) return SortResult.NoPage();
    const length = page.widgets.length;
    if(start < 0 || start >= length){
        return SortResult.OutBoundary("start", length, start);
    }else if(end < 0 || end >= length){
        return SortResult.OutBoundary("end", length, end);
    }
    swapArray(page.widgets, start, end);
    page = await page.save();
    return SortResult.Success(page);
};

const validId = mongoose.Types.ObjectId.isValid;

function toPojo(managed) {
    if(managed instanceof Widget) return managed.toObject();
    else return managed;
}

function swapArray(array, startId, endId) {
    array.splice(endId, 0, array.splice(startId, 1)[0]);
    return array;
}

class SortResult{
    constructor(noPage, outBoundary, success){
        this.data = [noPage, outBoundary, success];
    }

    onNotFound(callback1){
        const data = this.data;
        if(data[0]) callback1(data[0]);
        return {
            onOutBoundary(callback2){
                if(data[1]) callback2(data[1]);
                return {
                    onSuccess(callback3){
                        if(data[2]) callback3(data[2]);
                    }
                };
            }
        };
    }

    static NoPage(){
        return new SortResult(true, null, null);
    }

    static OutBoundary(name, limit, fact){
        return new SortResult(null, {name, limit, fact}, null);
    }

    static Success(result){
        return new SortResult(null, null, result);
    }
}