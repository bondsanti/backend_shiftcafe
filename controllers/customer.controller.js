const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const customerModel = require('./../models/customer.model')

exports.addCustomer = (req, res) => {
  const today = new Date()
  customerModel
    .create({
      pname: req.body.pname,
      fname: req.body.fname,
      lname: req.body.lname,
      birthday: req.body.birthday,
      tel: req.body.tel,
      email: req.body.email,
      address: req.body.address,
      ref_level_id: req.body.ref_level_id,
      point: req.body.point,
      member_no:`${today.getFullYear()+543}${today.getMonth()+1}${today.getDate()}${Math.floor(Math.random() * (9999 - 1000) + 1000)}`
    })
    .then(async cus => {
      await addLog(req.user._id, `add customer => ${cus.fname}`)
      res.status(CODE_COMPLETE).json({
        message: 'add customer complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'add customer uncomplete',
        error: e
      })
    })
}

exports.updateCustomer = (req, res) => {
  customerModel
    .findByIdAndUpdate(
      { _id: req.params.id },
      {
        pname: req.body.pname,
        fname: req.body.fname,
        lname: req.body.lname,
        birthday: req.body.birthday,
        tel: req.body.tel,
        email: req.body.email,
        address: req.body.address,
        ref_level_id: req.body.ref_level_id,
        point: req.body.point
      }
    )
    .then(async cus => {
      await addLog(req.user._id, `update customer => ${cus.fname}`)
      res.status(CODE_COMPLETE).json({
        message: 'update customer complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'update customer uncomplete',
        error: e
      })
    })
}

exports.deleteCustomer = (req, res) => {
  customerModel
    .findByIdAndDelete({ _id: req.params.id })
    .then(async cus => {
      await addLog(req.user._id, `delete customer => ${cus.fname}`)
      res.status(CODE_COMPLETE).json({
        message: 'delete customer complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'delete customer uncomplete',
        error: e
      })
    })
}

exports.allCustomer = async (req, res) => {
  const cus = await customerModel.find().populate('ref_level_id')

  const newCus = cus.filter(c => c.pname !== 'guest')
  res.status(CODE_COMPLETE).json(newCus)
}

exports.allCustomer2 = (req, res) => {
  customerModel
    .find()
    .populate('ref_level_id')
    .then(cus => {
      res.status(CODE_COMPLETE).json(cus)
    })
}

exports.getCustomerById = (req, res) => {
  customerModel
    .findById({ _id: req.params.id })
    .populate('ref_level_id')
    .then(cus => {
      res.status(CODE_COMPLETE).json(cus)
    })
}

exports.getCustomerByTel = (req, res) => {
  customerModel
    .find({ tel: req.params.id })
    .then(cus => {
      res.status(CODE_COMPLETE).json(cus)
    })
}
