const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    ref_uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Unit'
    },
    ref_cate_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    img:{
        type:String,
        
    },
    price_cost:{
        type:String,
        required:true  
    },
    price:{
        type:String,
        required:true
    },
    stock:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    }
})

module.exports = mongoose.model('Product',productSchema)