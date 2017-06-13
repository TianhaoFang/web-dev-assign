const mongoose = require("mongoose");
const Website = mongoose.model("Website", require("./website.schema.server"));

const validId = mongoose.Types.ObjectId.isValid;

Website.createWebsiteForUser = async function(userId, website) {
    const User = Website.model("User");
    const user = await User.findUserById(userId);
    if(!user) return null;
    website = toPojo(website);
    delete website.dateCreated;
    website.pages = [];
    website._user = user._id;
    const result = await this.create(website);
    await User.findByIdAndUpdate(userId, {
        $push: { websites: result._id }
    });
    return result;
};

Website.findAllWebsitesForUser = async function(userId) {
    const User = Website.model("User");
    if(!validId(userId)) return [];
    let user = await User.findById(userId).populate("websites").exec();
    if(!user) return [];
    return user.websites;
};

Website.findWebsiteById = async function (websiteId) {
    if(!validId(websiteId)) return null;
    return await this.findById(websiteId).exec();
};

Website.updateWebsite = async function (websiteId, website) {
    const oldOne = await this.findWebsiteById(websiteId);
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
    const Page = Website.model("Page");
    const User = Website.model("User");
    const oldOne = await this.findWebsiteById(websiteId);
    if(!oldOne) return null;
    await Promise.all([
        this.deleteOne({_id: websiteId}),
        User.update({_id: oldOne._user}, {$pull: {websites: websiteId}})
    ].concat(oldOne.pages.map(p => Page.deletePage(p))));
    return oldOne;
};

function toPojo(managed) {
    if(managed instanceof Website) return managed.toObject();
    else return managed;
}

module.exports = Website;