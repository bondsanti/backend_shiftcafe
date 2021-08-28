const mongoose = require('mongoose')

const unitSchema = new mongoose.Schema(
  {
    u_name: {
      type: String,
      required: true
    }
  },
  {
    toJSON: { virtuals: true }
  }
)
unitSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'ref_uid'
})

module.exports = mongoose.model('Unit', unitSchema)
