const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    ref_order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    ref_emp_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
        required:true
    },
    ref_cus_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
   
    type_payment:String,
    ref_bank_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Bank',
    },
    receive_money:Number,
    withdraw_money:Number,
    datetime:{
        type:Date,
        default:Date.now()
    }
    
})

module.exports = mongoose.model('Payment',paymentSchema)