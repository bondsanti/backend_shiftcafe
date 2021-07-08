const mongoose = require('mongoose')

const stockSchema = new mongoose.Schema({
    ref_pro_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    },
    qty_min:{
        type:Number,
        required:true
    },
    qty_max:{
        type:Number,
        required:true
    },
    ref_emp_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    datetime:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Stock', stockSchema)