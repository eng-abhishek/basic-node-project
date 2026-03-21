const userModel = require('../models/userModel');

const userDashboard = async (req,res) => {

  // const users = await userModel.find();
  // res.json(users);

  res.json({message:'Welcome to user dashboard'});
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
    userListing
}