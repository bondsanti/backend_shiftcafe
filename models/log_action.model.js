const mongoose = require("mongoose")

const logSchema = new mongoose.Schema({
    emp_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
    },
    activity:String,
    datetime:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model("LogAction",logSchema)