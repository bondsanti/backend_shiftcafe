const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const CouponModel = require('./../models/coupon.model')

exports.addCoupon = (req,res)=>{
    CouponModel.create({
        codename:req.body.codename,
        ref_emp_id_by:req.user._id,
        ref_emp_id:req.body.ref_emp_id,
        start:req.body.start,
        end:req.body.end,
        discount:req.body.discount,
        num_use:req.body.num_use,
    }).then(async coupon=>{
       await addLog(req.user._id,`add coupon CODE => ${coupon.codename}`)
       res.status(CODE_COMPLETE).json({
           message:'add coupon complete'
       })
    }).catch(e=>{
        res.status(CODE_WARNING).json({
            message:'add coupon uncomplete',
            error:e
        })
    })
}

exports.updateCoupon = (req,res)=>{
    CouponModel.findByIdAndUpdate({_id:req.params.id},{
        codename:req.body.codename,
        ref_emp_id_by:req.user._id,
        ref_emp_id:req.body.ref_emp_id,
        start:req.body.start,
        end:req.body.end,
        discount:req.body.discount,
        num_use:req.body.num_use,
        status:req.body.status,
    }).then(async coupon=>{
        await addLog(req.user._id,`update coupon CODE => ${coupon.codename}`)
        res.status(CODE_COMPLETE).json({
            message:'update coupon complete'
        })
     }).catch(e=>{
         res.status(CODE_WARNING).json({
             message:'update coupon uncomplete',
             error:e
         })
     })
}

exports.deleteCoupon = (req,res)=>{
    CouponModel.findByIdAndDelete({_id:req.params.id})
    .then(async coupon=>{
        await addLog(req.user._id,`delete coupon CODE => ${coupon.codename}`)
        res.status(CODE_COMPLETE).json({
            message:'delete coupon complete'
        })
     }).catch(e=>{
         res.status(CODE_WARNING).json({
             message:'delete coupon uncomplete',
             error:e
         })
     })
}

exports.allCoupon = (req,res)=>{
    CouponModel.find()
    .populate('ref_emp_id','fname lname')
    .populate('ref_emp_id_by','fname lname')
    .then(coupon=>{
        res.status(CODE_COMPLETE).json(coupon)
    })
}

exports.getCouponByCodename = (req,res)=>{
    CouponModel.find({codename:req.params.codename}).then((c)=>{
        res.status(CODE_COMPLETE).json(c)
    })
}