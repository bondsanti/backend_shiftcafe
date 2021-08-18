const { addLog } = require('./addLog.controller')
const WithdrawModel = require('./../models/withdraw.model')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')

exports.addWithdraw = (req, res) => {
  //console.log(req.body)
  WithdrawModel.create({
    ref_emp_id: req.user._id,
    total_money: req.body.total_money,
    type: req.body.type,
    remark: req.body.remark,
    datetime: new Date(req.body.datetime)
  })
    .then(async wd => {
      await addLog(
        req.user._id,
        `add withdraw total money -> ${wd.total_money}`
      )
      res.status(CODE_COMPLETE).json({
        message: 'เพิ่มการถอนเสร็จสมบูรณ์'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'เพิ่มการถอนไม่สมบูรณ์',
        error: e
      })
    })
}

exports.updateWithdraw = (req, res) => {
  WithdrawModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      ref_emp_id: req.user._id,
      total_money: req.body.total_money,
      type: req.body.type,
    remark: req.body.remark

    }
  )
    .then(async wd => {
      await addLog(
        req.user._id,
        `update withdraw money ${wd.total_money} -> ${req.body.total_money} `
      )
      res.status(CODE_COMPLETE).json({
        message: 'อัพเดทการถอนเสร็จสมบูรณ์'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'อัพเดทการถอนไม่สมบูรณ์',
        error: e
      })
    })
}

exports.deleteWithdraw = (req, res) => {
  WithdrawModel.findByIdAndDelete({ _id: req.params.id })
    .then(async wd => {
      await addLog(req.user._id, `delete withdraw money id => ${wd._id} `)
      res.status(CODE_COMPLETE).json({
        message: 'ลบการถอนเสร็จสมบูรณ์'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'ลบการถอนไม่สมบูรณ์',
        error: e
      })
    })
}

exports.allWithdraw = (req,res)=>{
  WithdrawModel.find().populate('ref_emp_id').then(wd=>{
    res.status(CODE_COMPLETE).json(wd)
  })
}
