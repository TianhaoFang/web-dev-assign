const mongoose = require("mongoose");

const Page = mongoose.model("Page", require("./page.schema.server"));
const Website = require("./website.model.server");
const Widget = require("./widget.model.server");

module.exports = Page;

Page.createPage = async function (websiteId, page) {
    const website = await Website.findWebsiteById(websiteId);
    if(!website) return null;
    page = toPojo(page);
    page._website = website._id;
    page.widgets = [];
    delete page.dateCreated;
    let instance = await this.create(page);
    website.pages.push(instance._id);
    await website.save();
    return instance;
};

Page.findAllPagesForWebsite = async function (websiteId) {
    let website = await Website.findWebsiteById(websiteId);
    if(!website) return [];
    website = await website.populate("pages");
    return website.pages;
};

Page.findPageById = function(pageId) {
    if(!validId(pageId)) return null;
    return this.findById(pageId).exec();
};

Page.updatePage = async function (pageId, page) {
    const oldOne = await this.findPageById(pageId);
    if(!oldOne) return null;
    page = toPojo(page);
    delete page._website;
    delete page.widgets;
    delete page.dateCreated;
    Object.assign(oldOne, page);
    return await oldOne.save();
};

Page.deletePage = async function(pageId) {
    const result = await this.findPageById(pageId);
    if(!result) return null;
    await Promise.all([
        this.deleteOne({_id: result._id}),
        Website.update({_id: result._website}, {$pull: {pages: pageId}}),
        Widget.deleteMany({_page: result._id})
    ]);
    return result;
};

const validId = mongoose.Types.ObjectId.isValid;
function toPojo(managed) {
    if(managed instanceof Page) return managed.toObject();
    else return managed;
}