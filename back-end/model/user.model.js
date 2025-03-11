const mongoose=require('mongoose')


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
})

const User =mongoose.model("usercollection",userSchema)

module.exports= User