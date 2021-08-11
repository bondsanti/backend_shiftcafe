const mongoose = require('mongoose')
const today = new Date()
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
    password:String,
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
        //required:true 
    },
    point:{
        type:Number,
        default:0 
    },
    member_no:{
        type:String,
        required:true,
        unique : true
    },

    datetime:{
        type:Date,
        default:today 
    },
    mission:{
        start:{type:Date,default:today},
        end:{type:Date,default:new Date(today.getFullYear()+1,today.getMonth(),today.getDate())}
    }
})

module.exports = mongoose.model("Customer",customerSchema)