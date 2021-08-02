const mongoose = require('mongoose')

const bankSchema = new mongoose.Schema({
    bank_name:{
        type:String,
        required:true
    },
    bank_number:{
        type:String,
        required:true
    },
    img:String,
    img_cover:String,
})

module.exports = mongoose.model('Bank',bankSchema)