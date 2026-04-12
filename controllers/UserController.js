const userModel = require('../models/userModel');

const checkValidUser = async(req,res) => {
   res.status(200).json({user_id:req.user.id,role:req.user.role});
}

const userDashboard = async (req,res) => {

  const userInfo = await userModel.findById(req.user.id);
  res.status(200).json({userInfo});
}

  const userListing = async (req,res)=>{

  try{

    const userList = await userModel.find();
    res.json(userList);

  }catch(error){
    res.status(500).json({message:error.message});
  }
}

module.exports = {
    userDashboard,
    userListing,
    checkValidUser
}