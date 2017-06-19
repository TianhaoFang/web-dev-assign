function customAuth(validAsyncFunc) {
    return async (req, res, next) => {
        const user = req.user;
        if(!user) return sendUnauthorized(res, "please login first");
        if(await validAsyncFunc(user, req)){
            return next();
        }else{
            return sendUnauthorized(res, "the user is invalid for current visit");
        }
    }
}

function sendUnauthorized(res, message) {
    res.status(401).json({ message: message });
}

module.exports = {
    customAuth
};