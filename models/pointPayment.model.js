const mongoose = require('mongoose')

const pointPaymentSchema = new mongoose.Schema({
    ref_order_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Order',
        required:true
    },
    point:Number,
    datetime:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Point_payment',pointPaymentSchema)