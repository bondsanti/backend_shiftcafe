const mongoose = require('mongoose')

const levelMemberSchema = new mongoose.Schema({
    
    level_name:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    },
    img:String,
    target_price:Number,
    datetime:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("level_member",levelMemberSchema)