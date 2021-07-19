const mongoose = require('mongoose')
const today = new Date()
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
    ref_point_pay_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Point_payment',
    },
    invoice:{
        type:String,
        default:`${today.getDate()}${today.getMonth()+1}${today.getFullYear()}${today.getMinutes()}${today.getSeconds()}`
    },
    receive_money:Number,
    withdraw_money:Number,
    total_price:Number,
    discount_price:Number,
    after_discount:Number,
    after_vat:Number,
    vat_price:Number,
    net_price:Number,
    datetime:{
        type:Date,
        default:Date.now()
    }
    
})

module.exports = mongoose.model('Payment',paymentSchema)