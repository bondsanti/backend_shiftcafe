const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    cate_name: {
      type: String,
      required: true
    },
    img: String,
    topping: [
      {
        name: String,
        price: Number,
        status: { type: Boolean, default: true }
      }
    ]
  },
  {
    toJSON: {
      virtuals: true
    }
  }
)

categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'ref_cate_id'
})

module.exports = mongoose.model('Category', categorySchema)
