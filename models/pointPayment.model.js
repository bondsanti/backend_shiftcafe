const mongoose = require('mongoose')

const pointPaymentSchema = new mongoose.Schema({
    ref_payment_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Payment',
        required:true
    },
    point:Number
    
})

module.exports = mongoose.model('Point_payment',pointPaymentSchema)