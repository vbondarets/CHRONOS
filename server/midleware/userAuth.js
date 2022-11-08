const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function (){
    return function (req, res, next){
        if(req.method === "OPTIONS"){
            next();
        }
        try{
            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return next(ApiError.unauthorized('Token missing'));
            }
            const decoded = jwt.verify(token, process.env.SECRETKEY||"KHPI");
            req.user = decoded;
            next();
        } catch(err){
            return res.status(404).json({message:"Please Authorizate",
        err:err.message})
        }
    }
}

