const { addLog } = require('./addLog.controller')
const WithdrawModel = require('./../models/withdraw.model')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')

exports.addWithdraw = (req, res) => {
  WithdrawModel.create({
    ref_emp_id: req.user._id,
    total_money: req.body.total_money
  })
    .then(async wd => {
      await addLog(
        req.user._id,
        `add withdraw total money -> ${wd.total_money}`
      )
      res.status(CODE_COMPLETE).json({
        message: 'add withdraw complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'add withdraw uncomplete',
        error: e
      })
    })
}

exports.updateWithdraw = (req, res) => {
  WithdrawModel.findByIdAndUpdate(
    { _id: req.params.id },
    {
      ref_emp_id: req.user._id,
      total_money: req.body.total_money
    }
  )
    .then(async wd => {
      await addLog(
        req.user._id,
        `update withdraw money ${wd.total_money} -> ${req.body.total_money} `
      )
      res.status(CODE_COMPLETE).json({
        message: 'update withdraw complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'update withdraw uncomplete',
        error: e
      })
    })
}

exports.deleteWithdraw = (req, res) => {
  WithdrawModel.findByIdAndDelete({ _id: req.params.id })
    .then(async wd => {
      await addLog(req.user._id, `delete withdraw money id => ${wd._id} `)
      res.status(CODE_COMPLETE).json({
        message: 'delete withdraw complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'delete withdraw uncomplete',
        error: e
      })
    })
}
