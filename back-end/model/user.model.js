const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required
    },
    email:{
        type:String,
        required:true,
        unique
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:16
    },
    age:Number,


})
const userModel=mongoose.model("usercollection",userSchema)
module.exports={
    userModel
}