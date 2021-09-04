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
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  discount: {
    type: Number,
    required: true
  },
  num_use: {
    type: Number
  },
  status:{
    type:Number,
    default:0
  },
  detail:String
})

module.exports = mongoose.model('Coupon',couponSchema)
