const mongoose = require('mongoose')

const withdrawSchema = new mongoose.Schema({
    ref_emp_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    total_money:{
        type:Number,
        required:true
    },
    datetime:{
        type:Date,
        default:Date.now()
    },
    type:{
        type:String,
        required:true
    },
    remark:String
})

module.exports = mongoose.model('Withdraw',withdrawSchema)