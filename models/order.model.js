const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  ref_emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  bill_name: {
    type:String,
    required:true
  },
  type_order: Number,
  list_product: [
    {
      ref_pro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      price:Number,
      name:String,
      qty: Number
    }
  ],
  total_price: Number,
  datetime: {
    type: Date,
    default: Date.now()
  },
  status: { type: Number, default: 0 },
  remark: String
})

module.exports = mongoose.model('Order', orderSchema)
