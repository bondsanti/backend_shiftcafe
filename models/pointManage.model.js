const mongoose = require('mongoose')

const pointManageSchema = new mongoose.Schema({
    ref_cus_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Customer',
    },
    ref_emp_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Employee',
    },
    point:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    point_by:{
        type:String,
        required:true
    },
    datetime:{
        type:Date,
        default:Date.now()
    }
    
})

module.exports = mongoose.model('Point_manage',pointManageSchema)