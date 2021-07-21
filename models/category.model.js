const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    cate_name:{
        type:String,
        required:true
    },
    img:String
})

module.exports = mongoose.model("Category",categorySchema)