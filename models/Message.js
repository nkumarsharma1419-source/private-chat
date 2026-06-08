const mongoose=require('mongoose');
module.exports=mongoose.model('Message',new mongoose.Schema({
sender:String,text:String,time:{type:Date,default:Date.now}
}));
