const jwt = require("jsonwebtoken");
const config = require("config");

// the usage of this file is for user authentication

// define and export a middleware function. next is the callback we have to run once we are done, so that it moves to the next piece of middleware
module.exports = function (req,res,next) {
    // get token from header
    const token = req.header('x-auth-token');

    //check if not token
    if (!token) {
        return res.status(401).json({msg:"No token, authorization denied"}); //401 means not authorized
    }

    // if the token exists, verify the token
    try {
        const decoded = jwt.verify(token,config.get("jwtSecret")); //decode the token

        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json({msg:"token is not valid"});
    }

}