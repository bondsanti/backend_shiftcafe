const { addLog } = require('./addLog.controller')
//const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const PointPaymentModel = require('./../models/pointPayment.model')
const CustomerModel = require('./../models/customer.model')
//const OrderModel = require('./../models/order.model')


exports.addPointPayment = async(new_point,cus_id,pay_id)=>{
 try{ const point =  await PointPaymentModel.create({
        ref_payment_id:pay_id,
        point:new_point,
    })
  
  const cus = await CustomerModel.findById({_id:cus_id})
  const newPoint = point.point + cus.point
  const cus2 = await CustomerModel.findByIdAndUpdate({_id:cus_id},{point:newPoint})
  await addLog(req.user._id,`add new ${point.point} point payment where payment id -> ${point.ref_payment_id}`)
  return true
}catch(e){
    return false
}
}