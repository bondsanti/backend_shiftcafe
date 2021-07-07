const mongoose = require('mongoose')

const levelMemberSchema = new mongoose.Schema({
    
    level_name:{
        type:String,
        required:true
    },
    discount:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model("level_member",levelMemberSchema)