const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    position:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Role",roleSchema)