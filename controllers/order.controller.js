const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')
const OrderModel = require('./../models/order.model')

exports.addOrder = (req, res) => {
  if (req.body.cus_type === 'guest') {
    OrderModel.create({
      ref_emp_id: req.user._id,
      list_product: req.body.list_product,
      cus_type: req.body.cus_type,
      ref_cus_id: '60e6b6e8a7a8ca27e266b50f',
      type_order: req.body.type_order,
      subprice: req.body.subprice,
      discount: req.body.discount,
      vat: req.body.vat,
      total_amount: req.body.total_amount,
      status: req.body.status
    })
      .then(async order => {
        await addLog(req.user._id, `add order id = ${order._id}`)
        res.status(CODE_COMPLETE).json({
          message: 'add order complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'add order uncomplete',
          error: e
        })
      })
  } else {
    OrderModel.create({
      ref_emp_id: req.user._id,
      list_product: req.body.list_product,
      cus_type: req.body.cus_type,
      ref_cus_id: req.body.ref_cus_id,
      type_order: req.body.type_order,
      subprice: req.body.subprice,
      discount: req.body.discount,
      vat: req.body.vat,
      total_amount: req.body.total_amount,
      status: req.body.status
    })
      .then(async order => {
        await addLog(req.user._id, `add order id = ${order._id}`)
        res.status(CODE_COMPLETE).json({
          message: 'add order complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'add order uncomplete',
          error: e
        })
      })
  }
}

exports.updateOrder = (req, res) => {
  if (req.body.cus_type === 'guest') {
    OrderModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ref_emp_id: req.user._id,
        list_product: req.body.list_product,
        cus_type: req.body.cus_type,
        ref_cus_id: '60e6b6e8a7a8ca27e266b50f',
        type_order: req.body.type_order,
        subprice: req.body.subprice,
        discount: req.body.discount,
        vat: req.body.vat,
        total_amount: req.body.total_amount,
        status: req.body.status,
        remark: req.body.remark
      }
    )
      .then(async order => {
        await addLog(req.user._id, `update order id = ${order._id}`)
        res.status(CODE_COMPLETE).json({
          message: 'update order complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'update order uncomplete',
          error: e
        })
      })
  } else {
    OrderModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ref_emp_id: req.user._id,
        list_product: req.body.list_product,
        cus_type: req.body.cus_type,
        ref_cus_id: req.body.ref_cus_id,
        type_order: req.body.type_order,
        subprice: req.body.subprice,
        discount: req.body.discount,
        vat: req.body.vat,
        total_amount: req.body.total_amount,
        status: req.body.status,
        remark: req.body.remark
      }
    )
      .then(async order => {
        await addLog(req.user._id, `update order id = ${order._id}`)
        res.status(CODE_COMPLETE).json({
          message: 'update order complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'update order uncomplete',
          error: e
        })
      })
  }
}

exports.deleteOrder = (req,res)=>{
    OrderModel.findByIdAndDelete({_id:req.params.id})
    .then(async order => {
        await addLog(req.user._id, `delete order id = ${order._id}`)
        res.status(CODE_COMPLETE).json({
          message: 'delete order complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'delete order uncomplete',
          error: e
        })
      })
}

exports.allOrder = (req,res)=>{
  OrderModel.find().populate('ref_cus_id').then(order=>{
    res.status(CODE_COMPLETE).json(order)
  })
}
