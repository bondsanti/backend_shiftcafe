const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
  codename: {
    type: String,
    required: true
  },
  ref_emp_id_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  ref_emp_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  exp: {
    type: Date,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  num_use: {
    type: Number
  }
})

module.exports = mongoose.model('Coupon',couponSchema)
