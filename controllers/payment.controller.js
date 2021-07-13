const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')
const PaymentModel = require('./../models/payment.model')

exports.addPayment = (req, res) => {
  let newPayment = {}
  if (req.body.type_payment == 2) {
    newPayment = {
      ref_order_id: req.body.ref_order_id,
      ref_emp_id: req.user._id,
      ref_point_id: req.body.ref_point_id,
      type_payment: req.body.type_payment,
      ref_bank_id: req.body.ref_bank_id,
      receive_money: req.body.receive_money,
      withdraw_money: req.body.withdraw_money
    }
  } else {
    newPayment = {
      ref_order_id: req.body.ref_order_id,
      ref_emp_id: req.user._id,
      ref_point_id: req.body.ref_point_id,
      type_payment: req.body.type_payment,
      receive_money: req.body.receive_money,
      withdraw_money: req.body.withdraw_money
    }
  }
  PaymentModel.create(newPayment)
    .then(async pay => {
      await addLog(req.user._id, `add payment id -> ${pay._id}`)
      res.status(CODE_COMPLETE).json({
        message: 'add payment complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'add payment uncomplete',
        error: e
      })
    })
}

exports.updatePayment = (req,res)=>{
    let newPayment = {}
  if (req.body.type_payment == 2) {
    newPayment = {
      ref_order_id: req.body.ref_order_id,
      ref_emp_id: req.user._id,
      ref_point_id: req.body.ref_point_id,
      type_payment: req.body.type_payment,
      ref_bank_id: req.body.ref_bank_id,
      receive_money: req.body.receive_money,
      withdraw_money: req.body.withdraw_money
    }
  } else {
    newPayment = {
      ref_order_id: req.body.ref_order_id,
      ref_emp_id: req.user._id,
      ref_point_id: req.body.ref_point_id,
      type_payment: req.body.type_payment,
      receive_money: req.body.receive_money,
      withdraw_money: req.body.withdraw_money
    }
  }
  PaymentModel.findByIdAndUpdate({_id:req.params.id},newPayment)
    .then(async pay => {
      await addLog(req.user._id, `update payment id -> ${pay._id}`)
      res.status(CODE_COMPLETE).json({
        message: 'update payment complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'update payment uncomplete',
        error: e
      })
    })
}

exports.deletePayment = (req,res)=>{
    PaymentModel.findByIdAndDelete({_id:req.params.id})
    .then(async pay => {
        await addLog(req.user._id, `delete payment id -> ${pay._id}`)
        res.status(CODE_COMPLETE).json({
          message: 'delete payment complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'delete payment uncomplete',
          error: e
        })
      })
}

exports.allPayment = (req,res)=>{
  PaymentModel.find().then(payment=>{
    res.status(CODE_COMPLETE).json(payment)
  })
}
