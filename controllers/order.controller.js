const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')
const OrderModel = require('./../models/order.model')

exports.addOrder = (req, res) => {
  OrderModel.create({
    ref_emp_id: req.user._id,
    list_product: req.body.list_product,
    type_order: req.body.type_order,
    total_price: req.body.total_price,
    bill_name: req.body.bill_name
  })
    .then(async order => {
      await addLog(req.user._id, `add order id = ${order._id}`)
      res.status(CODE_COMPLETE).json({
        message: 'add order complete',
        data:order
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'add order uncomplete',
        error: e
      })
    })
}

exports.updateOrder = (req, res) => {
  OrderModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      ref_emp_id: req.user._id,
      list_product: req.body.list_product,
      type_order: req.body.type_order,
      total_price: req.body.total_price,
      bill_name: req.body.bill_name
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

exports.deleteOrder = (req, res) => {
  OrderModel.findByIdAndDelete({ _id: req.params.id })
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

exports.allOrder = (req, res) => {
  OrderModel.find()
  .then(order => {
    res.status(CODE_COMPLETE).json(order)
  })
}

exports.holdOrder = (req, res) => {
  OrderModel.find({status:0})
  .then(order => {
    res.status(CODE_COMPLETE).json(order)
  })
}
