const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  ref_emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  cus_type: String,
  ref_cus_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  type_order: Number,
  list_product: [
    {
      ref_pro_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      qty: Number
    }
  ],
  subprice: Number,
  discount: Number,
  vat: Number,
  total_amount: Number,
  datetime: {
    type: Date,
    default: Date.now()
  },
  status: { type: Number, default: 0 },
  remark: String
})

module.exports = mongoose.model('Order', orderSchema)
