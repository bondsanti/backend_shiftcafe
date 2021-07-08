const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const PointPaymentModel = require('./../models/pointPayment.model')
const CustomerModel = require('./../models/customer.model')
const OrderModel = require('./../models/order.model')


exports.addPointPayment = async(req,res)=>{
 try{ const point =  await PointPaymentModel.create({
        ref_order_id:req.body.ref_order_id,
        point:req.body.point,
    })
  const order = await OrderModel.findOne({_id:point.ref_order_id})
  const cus = await CustomerModel.findById({_id:order.ref_cus_id})
  const newPoint = point.point + cus.point
  const cus2 = await CustomerModel.findByIdAndUpdate({_id:order.ref_cus_id},{point:newPoint})
  await addLog(req.user._id,`add new ${point.point} point payment where order id -> ${point.ref_order_id}`)
  res.status(CODE_COMPLETE).json({
      message:'add point payment complete'
  })
}catch(e){
    res.status(CODE_WARNING).json({
        message:'add point payment uncomplete',
        error:e
    })
}
}