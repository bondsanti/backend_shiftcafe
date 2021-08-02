const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')
const PaymentModel = require('./../models/payment.model')
const PointPaymentModel = require('./../models/pointPayment.model')
const OrderModel = require('./../models/order.model')
const CustomerModel = require('./../models/customer.model')
//const PointManageModel = require('./../models/pointManage.model')
const { addPointByPayment } = require('./pointManage.controller')
//const { addPointPayment } = require('./pointPayment.controller')

exports.addPayment = async (req, res) => {
  const today = new Date()
  if (parseInt(req.body.receive_money) < parseInt(req.body.net_price)) {
    res.status(CODE_WARNING).json({
      message: 'ยอดเงินที่รับมาไม่พอจ่ายค่าสินค้า'
    })
    return
  }

  const newPoint = Math.floor(req.body.total_price / 100) * 5

  const point = await PointPaymentModel.create({
    ref_cus_id: req.body.ref_cus_id,
    point: newPoint
  })

  let newPayment = {}
  if (req.body.type_payment === 'transfer') {
    newPayment = {
      ref_order_id: req.body.ref_order_id,
      ref_emp_id: req.user._id,
      ref_cus_id: req.body.ref_cus_id,
      type_payment: req.body.type_payment,
      ref_bank_id: req.body.ref_bank_id,
      receive_money: req.body.receive_money,
      withdraw_money: req.body.withdraw_money,
      total_price: req.body.total_price,
      discount_price: req.body.discount_price,
      after_discount: req.body.after_discount,
      vat_price: req.body.vat_price,
      after_vat: req.body.after_vat,
      net_price: req.body.net_price,
      ref_point_pay_id: point.id,
      datetime:today,
      invoice: `${today.getDate()}${(today.getMonth()+1) < 10 ? '0'+ (today.getMonth()+1) :(today.getMonth()+1) }${today.getFullYear()}${Math.floor(
        Math.random() * (999 - 100) + 100
      )}${today.getMinutes() < 10 ?'0' + today.getMinutes():today.getMinutes()}`
    }
  } else {
    newPayment = {
      ref_order_id: req.body.ref_order_id,
      ref_emp_id: req.user._id,
      ref_cus_id: req.body.ref_cus_id,
      type_payment: req.body.type_payment,
      receive_money: req.body.receive_money,
      withdraw_money: req.body.withdraw_money,
      total_price: req.body.total_price,
      discount_price: req.body.discount_price,
      after_discount: req.body.after_discount,
      vat_price: req.body.vat_price,
      after_vat: req.body.after_vat,
      net_price: req.body.net_price,
      ref_point_pay_id: point.id,
      datetime:today,
      invoice: `${today.getDate()}${today.getMonth() +
        1}${today.getFullYear()}${Math.floor(
        Math.random() * (999 - 100) + 100
      )}${today.getMinutes() < 10 ?'0' + today.getMinutes():today.getMinutes()}`
    }
  }

  PaymentModel.create(newPayment)
    .then(async pay => {
      await addLog(req.user._id, `add payment id -> ${pay._id}`)
      await addPointByPayment(req.body.ref_cus_id, newPoint, req.user._id)
      await OrderModel.findByIdAndUpdate(
        { _id: pay.ref_order_id },
        {
          status: 1,
          type_order: req.body.type_order,
          list_product: req.body.orders
        }
      )
      res.status(CODE_COMPLETE).json({
        message: 'add payment complete',
        data: pay
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'add payment uncomplete',
        error: e
      })
    })
}

exports.updatePayment = (req, res) => {
  // let newPayment = {}
  // if (req.body.type_payment == 2) {
  //   newPayment = {
  //     ref_order_id: req.body.ref_order_id,
  //     ref_emp_id: req.user._id,
  //     ref_point_id: req.body.ref_point_id,
  //     type_payment: req.body.type_payment,
  //     ref_bank_id: req.body.ref_bank_id,
  //     receive_money: req.body.receive_money,
  //     withdraw_money: req.body.withdraw_money
  //   }
  // } else {
  //   newPayment = {
  //     ref_order_id: req.body.ref_order_id,
  //     ref_emp_id: req.user._id,
  //     ref_point_id: req.body.ref_point_id,
  //     type_payment: req.body.type_payment,
  //     receive_money: req.body.receive_money,
  //     withdraw_money: req.body.withdraw_money
  //   }
  // }
  PaymentModel.findByIdAndUpdate({ _id: req.params.id }, {status:req.body.status})
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

exports.deletePayment = (req, res) => {
  PaymentModel.findByIdAndDelete({ _id: req.params.id })
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

exports.allPayment = (req, res) => {
  PaymentModel.find()
    .populate('ref_order_id', 'order_no')
    .populate('ref_emp_id', 'username fname lname')
    .populate('ref_cus_id')
    .populate('ref_bank_id', 'bank_name')
    .populate('ref_point_pay_id', 'point')
    .then(payment => {
      res.status(CODE_COMPLETE).json(payment)
    })
}

exports.getPaymentByIdCustomer = (req, res) => {
  PaymentModel.find({ ref_cus_id: req.params.id })
    .populate('ref_point_pay_id')
    .then(payment => {
      res.status(CODE_COMPLETE).json(payment)
    })
}

exports.getPaymentById = (req, res) => {
  PaymentModel.findById({ _id: req.params.id })
    .populate('ref_order_id', 'type_order')
    .then(payment => {
      res.status(CODE_COMPLETE).json(payment)
    })
}

exports.getPaymentByToday = (req, res) => {
  const today = new Date()
  PaymentModel.find({
    datetime: {
      $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate())
    }
  })
    .populate('ref_order_id', 'type_order')
    .then(payment => {
      res.status(CODE_COMPLETE).json(payment)
    })
}

exports.getPaymentByMonth = (req, res) => {
  const today = new Date()
  PaymentModel.find({
    datetime: {
      $lt: new Date(),
      $gt: new Date(today.getFullYear() + ',' + today.getMonth())
    }
  })
    .populate('ref_order_id', 'type_order')
    .then(payment => {
      res.status(CODE_COMPLETE).json(payment)
    })
}

exports.getPaymentByYear = (req, res) => {
  const today = new Date()
  PaymentModel.find({
    datetime: { $lt: new Date(), $gt: new Date(today.getFullYear()) }
  })
    .populate('ref_order_id', 'type_order')
    .then(payment => {
      res.status(CODE_COMPLETE).json(payment)
    })
}
