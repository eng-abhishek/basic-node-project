const userModel = require('../../models/userModel');
const blackListModel = require('../../models/blacklistModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminLogin = async (req,res) => {
 
const {email, password} = req.body;
const adminUser = await userModel.findOne({email:email, role:'admin'});

if(!adminUser){
    return res.status(404).json({message:'This is not valid admin credentials'});
}

const isMatch = bcrypt.compare(password, adminUser.password);
if(!isMatch){
    return res.status(400).json({message:'This is not valid admin credentials'});   
}

const token = jwt.sign({id:adminUser._id}, process.env.admin_JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});

res.status(200).json({token, message:'Admin login successful'});

}

const adminLogout = async (req,res) =>{
    const user_token = req.header('Authorization');
    
    if(!user_token){
            return res.status(400).json({message:'No token provided'}); 
    }

    const token = user_token.split(' ')[1];

    await blackListModel.create({blackListToken:token});  

    res.json({message:'Admin Logout API'});  
}

module.exports = {
    adminLogin,
    adminLogout
}