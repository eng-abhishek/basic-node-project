const jwt = require('jsonwebtoken');
const blackListModel = require('../models/blacklistModel');


const adminAuthMiddleware = async (req,res,next) => {
 
  const user_token = req.header('Authorization');

  if(!user_token){
    return res.status(401).json({message:'Access denied. No token provided.'});
  }

  const token = user_token.split(' ')[1];
  
  try{
  
   const blackListedToken = await blackListModel.findOne({blackListToken:token});
   if(blackListedToken){
     return res.status(401).json({message:'Access denied. Token is blacklisted.'});
   }

   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.admin = decoded;
   next();

  }catch(error){
 
   res.status(500).json({message:error.message});
  }

}

module.exports = adminAuthMiddleware;