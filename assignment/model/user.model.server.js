const mongoose = require("mongoose");

const User = mongoose.model("User", require("./user.schema.server"));

const validId = mongoose.Types.ObjectId.isValid;

User.createUser = function (user) {
    user.websites = [];
    delete user.dateCreated;
    user = new this(user);
    return user.save();
};

User.findUserById = async function (userId) {
    if (!validId(userId)) return null;
    return await this.findById(userId).exec();
};

User.findUserByUsername = function (username) {
    return this.findOne({username}).exec();
};

User.findUserByCredentials = function (username, password) {
    return this.findOne({username, password}).exec();
};

User.findUserByFacebookId = function (facebookId) {
    return this.findOne({ "facebook.id": facebookId });
};

User.updateUser = async function (userId, user) {
    let oldUser = await this.findUserById(userId);
    if (!oldUser) return null;
    user = toPojo(user);
    delete user._id;
    delete user.dateCreated;
    delete user.websites;
    Object.assign(oldUser, user);
    return await oldUser.save();
};

User.deleteUser = async function (userId) {
    const Website = this.model("Website");
    const user = await this.findUserById(userId);
    if (!user) return null;
    await Promise.all([this.deleteOne({_id: user._id})]
        .concat(user.websites.map(w => Website.deleteWebsite(w))));
    return user;
};

function toPojo(managed) {
    if (managed instanceof User) {
        return managed.toObject();
    } else {
        return managed;
    }
}

module.exports = User;