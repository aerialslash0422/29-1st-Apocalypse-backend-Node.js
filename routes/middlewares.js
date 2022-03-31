const jwt = require('jsonwebtoken');

const User = require('../models/user')

exports.verify = (req,res,next) => {
    try{
        req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET, {algorithm:"HS256"})
        return next();
    }catch (error){
        return res.status(401).json({
            code : 401,
            message : 'Unauthorized'
        })
    }
