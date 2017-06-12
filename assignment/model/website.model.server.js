const mongoose = require("mongoose");

const User = require("./user.model.server");
const Website = mongoose.model("Website", require("./website.schema.server"));

Website.createWebsiteForUser = async function(userId, website) {
    const user = await User.findUserById(userId);
    if(!user) return null;
    website = toPojo(website);
    delete website.dateCreated;
    website.pages = [];
    website._user = userId;
    return this.create(website);
};

Website.findAllWebsitesForUser = async function(userId) {
    const user = await User.findUserById(userId);
    if(!user) return [];
    return user.websites;
};

Website.findWebsiteById = async function (websiteId) {
    return await this.findById(websiteId).exec();
};

Website.updateWebsite = async function (websiteId, website) {
    const oldOne = this.findWebsiteById(websiteId);
    if(!oldOne) return null;
    website = toPojo(website);
    delete website._id;
    delete website._user;
    delete website.pages;
    delete website.dateCreated;
    Object.assign(oldOne, website);
    return await oldOne.save();
};

Website.deleteWebsite = async function (websiteId) {
    const oldOne = await this.findWebsiteById(websiteId);
    if(!oldOne) return null;
    return await this.deleteOne({_id: websiteId});
};

function toPojo(managed) {
    if(managed instanceof Website) return managed.toObject();
    else return managed;
}

module.exports = Website;