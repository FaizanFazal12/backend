const { getUser } = require("../services");

async function checkforauthentication(req, res, next) {
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if (!tokenCookie) {
        return next();
    }
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    return next();
}

module.exports={
    checkforauthentication
}