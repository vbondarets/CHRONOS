const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function (role){
    return function (req, res, next){
        if(req.method === "OPTIONS"){
            next();
        }
        try{
            const token = req.headers.authorization.split(' ')[1];
            if (!token){
                return res.status(404).json({message:"Token is missing"})
            }
            
            const decoded = jwt.verify(token, process.env.SECRETKEY || 'KHPI');
            console.log(decoded.role)
            if(decoded.role != role){
                return res.status(404).json({message:"U cat do it"})
            }
            req.user = decoded;
            next();
        } catch(err){
            return res.status(404).json({message:"Please Authorizate"})
        }
    }
}