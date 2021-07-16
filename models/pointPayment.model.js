const mongoose = require('mongoose')

const pointPaymentSchema = new mongoose.Schema({
    ref_cus_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
        required:true
    },
    point:Number
    
})

module.exports = mongoose.model('Point_payment',pointPaymentSchema)