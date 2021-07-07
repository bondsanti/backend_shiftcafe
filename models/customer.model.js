const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
    fname:{
        type:String,
        required:true 
    },
    lname:{
        type:String,
        required:true 
    },
    birthday:{
        type:Date,
        required:true 
    },
    tel:{
        type:String,
        required:true 
    },
    email:{
        type:String,
        required:true 
    },
    address:{
        type:String,
        required:true 
    },
    ref_level_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'level_member',
        required:true 
    },
    point:{
        type:Number,
        default:0 
    },
    datetime:{
        type:Date,
        default:Date.now() 
    }
})

module.exports = mongoose.model("Customer",customerSchema)