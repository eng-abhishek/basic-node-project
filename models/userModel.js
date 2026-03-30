const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   username:{type:String,required:true,unique:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   address:{type:String,required:true},
   profileImage:{type:String},
   dob:{type:Date,required:true},
   is_indian_citizon:{type:Boolean,required:true},
   skills:{type:String,required:true},
   gender:{type:String,required:true},
   state:{type:String,required:true},
   role:{type:String},
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);