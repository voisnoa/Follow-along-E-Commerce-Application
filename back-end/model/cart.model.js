const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    productID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    Quantity:{
        type:Number,
        required:true
    },
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const cartModel= mongoose.model('productCollection', cartSchema)

module.exports = {cartModel};