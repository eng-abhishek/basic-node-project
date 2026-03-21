const mongoose = require('mongoose');

const blackListSchema = new mongoose.Schema({
  blackListToken:{type:String,required:true}
});

module.exports = mongoose.model('BlackList', blackListSchema);