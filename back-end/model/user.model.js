const mongoose=require('mongoose')
const { type } = require('os')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:16
    },
    address:{
        type:String,
        default:""
    }

    // age:Number,
})
const userModel=mongoose.model("usercollection",userSchema)
module.exports={
    userModel
}