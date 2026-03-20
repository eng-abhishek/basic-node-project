const userModel = require('../models/userModel');

const getData = async (req,res) => {
//res.json('Hello controller');
  const users = await userModel.find();
  res.json(users);
}

const createData = async (req,res) => {
const user = await userModel.create(req.body);
res.json(user);
}

module.exports = {
    getData,
    createData
}