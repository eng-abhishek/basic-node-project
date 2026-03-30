const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const blackListModel = require('../models/blacklistModel');

const multer = require('multer');   

const register = async (req,res)=>{

   try{

//    return res.json({message:'Register API',file:base64});

   const {username,email,password,dob,address,is_indian_citizon,state,skills,gender,role} = req.body;

    let user_role = role ? (role == "admin" ? "admin" : "user") : "admin";

//    const profile_image = req.file ? req.file.path : null;

   const profile_image = req.file ? req.file.buffer.toString('base64') : null;

//    return res.json({message:'Register API',file:profile_image});

   const existuser = await userModel.findOne({username});

   if(existuser){
    return res.status(400).json({message:'Username already exist'});
   }


   const existemail = await userModel.findOne({email});

   if(existemail){
    return res.status(400).json({message:'Email already exist'});
   }


   const hashPassword = await bcrypt.hashSync(password,10); 

   const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    dob,
    address,
    profileImage: profile_image,
    is_indian_citizon,
    state,
    skills:Array.isArray(skills) ? skills.join(',') : '',
    gender,
    role:user_role
   });
   res.json(user);

   }catch(error){
    res.status(500).json({message:error.message});
   }
}

const login = async (req,res) => {
    
    try{

    const {email,password} = req.body;

    const checkemail = await userModel.findOne({email});
    
    if(!checkemail){
    res.status(400).json({message:'Invalid email or password'});
    }

    const checkpassword = await bcrypt.compare(password,checkemail.password);
    
    if(!checkpassword){
    res.status(400).json({message:'Invalid email or password'});
    }

    const token = jwt.sign({id:checkemail._id},"secretkey",{expiresIn:'1hr'});

    res.status(200).json({'token':token,'message':'login successfully.'});

    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

const logout = async (req,res) => {

    try{

    const token_raw = req.header('Authorization');
    
    if(!token_raw){
        return res.status(401).json({message:'Unauthorized'});
    }

    const token = token_raw.split(' ')[1];

    const blackListed = await blackListModel.create({blackListToken:token});
    res.json({message:'Logout successful',blackListed_token:blackListed});


    }catch(error){
        res.status(500).json({message:error.message});
    }

}

module.exports = {
    register,
    login,
    logout
}