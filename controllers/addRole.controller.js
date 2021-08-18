const RoleModel = require('./../models/role.model')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')
const { addLog } = require('./addLog.controller')

exports.addRole = (req, res) => {
  //console.log(req.body.position)
  const { position } = req.body
  const newRole = new RoleModel({
    position
  })

  newRole.save(async (err, role) => {
    if (err) {
      res.status(CODE_WARNING).json({
        message: 'มีบางอย่างผิดพลาด',
        error: err
      })
    }

    if (role) {
      await addLog(req.user._id, `add role ${role.position}`)
      res.status(CODE_COMPLETE).json({
        massage: 'เพิ่มบทบาทเสร็จสมบูรณ์'
      })
    }
  })
}

exports.updateRole = (req, res) => {
  const { position } = req.body
  RoleModel.findByIdAndUpdate({ _id: req.params.id }, { position: position })
    .then(async role => {
      await addLog(req.user._id, `update role ${role.position}`)
      res.status(CODE_COMPLETE).json({
        massage: 'อัปเดตบทบาทเสร็จสมบูรณ์'
      })
    })
    .catch(err => {
      res.status(CODE_WARNING).json({
        massage: 'อัปเดตบทบาทไม่สมบูรณ์',
        error: err
      })
    })
}

exports.deleteRole = async (req, res) => {
  const id = req.params.id
  try {
    const role = await RoleModel.findOneAndDelete({ _id: id })
    await addLog(req.user._id, `delete role ${role.position}`)
    res.status(CODE_COMPLETE).json({
      message: `ลบบทบาทเสร็จสมบูรณ์`
    })
  } catch (e) {
    res.status(CODE_WARNING).json({
      message: 'ลบบทบาทไม่สมบูรณ์',
      error: e
    })
  }
}

exports.allRole = (req, res) => {
  RoleModel.find().then(role => {
    const newRole = role.filter(
      rl => rl.position !== 'admin'  && rl.position !== 'guest'
    )
    res.status(CODE_COMPLETE).json(newRole)
  })
}
