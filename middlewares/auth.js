const jwt = require('jsonwebtoken');


async function auth(req, res, next) {
    
    try {
    
        const token = req.header('x-auth-token');

        if(!token) {
            res.status(401).json({msg:"No token, authorization denied"});
            return;
        }

        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded;
        next();

    } catch(e) {
        res.status(400).json({msg: "Token is not valid"});
    } 
}

module.exports = auth;