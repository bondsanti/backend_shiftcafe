const RoleModel = require('./../models/role.model')
const { CODE_COMPLETE, CODE_WARNING ,CODE_ERROR} = require('../instant')
const { addLog } = require('./addLog.controller')

exports.addRole = (req, res) => {
  //console.log(req.body.position)
  const { position } = req.body
  const newRole = new RoleModel({
    position
  })

  newRole.save((err, role) => {
    if (err) {
      res.status(CODE_WARNING).json({
        message: 'Somthing went wrong',
        error: err
      })
    }

    if (role) {
      addLog('60dff0bf708d771ce8b1c7c1', `add role ${role.position}`)
      res.status(CODE_COMPLETE).json({
        massage: 'add role complete'
      })
    }
  })
}

exports.updateRole = (req, res) => {
  const { position } = req.body
  RoleModel.findByIdAndUpdate({ _id: req.params.id }, { position: position })
    .then(role => {
      addLog('60dff0bf708d771ce8b1c7c1', `update role ${role.position}`)
      res.status(CODE_COMPLETE).json({
        massage: 'update role complete'
      })
    })
    .catch(err => {
      res.status(CODE_WARNING).json({
        massage: 'update role uncomplete',
        error: err
      })
    })
}

exports.deleteRole = async (req, res) => {
  const id = req.params.id
  try {
    const role = await RoleModel.findOneAndDelete({ _id: id })
    addLog('60dff0bf708d771ce8b1c7c1', `delete role ${role.position}`)
    res.status(CODE_COMPLETE).json({
      message: `delete role complete`
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'delete role uncomplete',
      error: e
    })
  }
}
