const { addLog } = require('./addLog.controller')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const pointManageModel = require('./../models/pointManage.model')
const customerModel = require('./../models/customer.model')

exports.addPointManage = async (req, res) => {
  if (req.body.status === 'plus') {
    const cus = await customerModel.findById({ _id: req.body.ref_cus_id })
    const newPoint =cus.point + parseInt(req.body.point)
    try {
      await customerModel.findOneAndUpdate(
        { _id: cus._id },
        { point: newPoint }
      )
      const pointManage = await pointManageModel.create({
        ref_cus_id: req.body.ref_cus_id,
        ref_emp_id: req.body.ref_emp_id,
        point: req.body.point,
        status: req.body.status
      })
      addLog(
        req.user._id,
        `${pointManage.status} ${pointManage.point} point where customer id = ${pointManage.ref_cus_id}`
      )
      res.status(CODE_COMPLETE).json({
        message: `plus ${pointManage.point} point complete`
      })
    } catch (e) {
      res.status(CODE_WARNING).json({
        message: `plus ${pointManage.point} point uncomplete`,
        error: e
      })
    }
  } else {
    const cus = await customerModel.findById({ _id: req.body.ref_cus_id })
    if (cus.point >= parseInt(req.body.point)) {
      const newPoint = cus.point - parseInt(req.body.point)
      try {
        await customerModel.findOneAndUpdate(
          { _id: cus._id },
          { point: newPoint }
        )
        const pointManage = await pointManageModel.create({
          ref_cus_id: req.body.ref_cus_id,
          ref_emp_id: req.body.ref_emp_id,
          point: req.body.point,
          status: req.body.status
        })
        addLog(
          req.user._id,
          `${req.body.status} ${req.body.point} point where customer id = ${req.body.ref_cus_id}`
        )
        res.status(CODE_COMPLETE).json({
          message: `minus ${req.body.point} point complete`
        })
      } catch (e) {
        res.status(CODE_WARNING).json({
          message: `minus ${req.body.point} point uncomplete`,
          error: e
        })
      }
    } else {
      res.status(CODE_WARNING).json({
        message: `your point not enough to minus `
      })
    }
  }
}
