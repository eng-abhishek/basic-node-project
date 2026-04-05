const jwttoken= require('jsonwebtoken');
const blackListModel = require('../models/blacklistModel');

const authentication = async (req,res,next) => {

    const token_raw = req.header('Authorization');

    if(!token_raw){
        return res.status(401).json({message:'No token provided'});
    }

    const token = token_raw.split(' ')[1];

    if(!token){
        return res.status(401).json({message:'Unauthorized'});
    }

    try {
        // Check if token is blacklisted
        const blackListed = await blackListModel.findOne({ blackListToken:token });

        if(blackListed){
            return res.status(401).json({message:'Token expired, login again'});
        }

        // Verify JWT token
        const decode = jwttoken.verify(token, process.env.JWT_SECRET);
        req.user = decode;
        next();

    } catch(error) {
        return res.status(401).json({message:error.message});
    }
}

module.exports = authentication;