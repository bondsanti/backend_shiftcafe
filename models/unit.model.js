const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema({
    u_name:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Unit",unitSchema)