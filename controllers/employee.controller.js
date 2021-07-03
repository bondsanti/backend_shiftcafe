const bcrypt = require('bcrypt')
const { addLog } = require('./addLog.controller')
const EmployeeModel = require('./../models/employee.model')

exports.addEmployee = async (req, res) => {
  const {
    username,
    password,
    ref_id_role,
    idcard,
    pname,
    fname,
    lname,
    birthday,
    tel,
    email,
    address
  } = req.body

  const hashPassword = await bcrypt.hash(password, 10)

  const newEmpObj = {
    username: username,
    password: hashPassword,
    ref_id_role: ref_id_role,
    idcard: idcard,
    pname: pname,
    fname: fname,
    lname: lname,
    birthday: birthday,
    tel: tel,
    email: email,
    address: address
  }

  const newEmployee = new EmployeeModel(newEmpObj)

  newEmployee
    .save()
    .then(emp => {
      addLog(
        '60dff0bf708d771ce8b1c7c1',
        `add new employee ${emp.fname} ${emp.lname}`
      )
      res.status(200).json({
        message: 'add employee complete'
      })
    })
    .catch(e => {
      res.status(400).json({
        message: 'add employee uncomplete',
        error: e
      })
    })
}

exports.updateEmployee = async (req, res) => {
  const {
    id,
    username,
    password,
    ref_id_role,
    idcard,
    pname,
    fname,
    lname,
    birthday,
    tel,
    email,
    address
  } = req.body

  const hashPassword = await bcrypt.hash(password, 10)

  const newEmpObj = {
    username: username,
    password: hashPassword,
    ref_id_role: ref_id_role,
    idcard: idcard,
    pname: pname,
    fname: fname,
    lname: lname,
    birthday: birthday,
    tel: tel,
    email: email,
    address: address
  }

  EmployeeModel.findByIdAndUpdate({ _id: id }, newEmpObj)
    .then(emp => {
      addLog('60dff0bf708d771ce8b1c7c1', `update employee => ${emp.fname} ${emp.lname}`)

      res.status(200).json({
        message: 'update employee complete'
      })
    })
    .catch(e => {
      res.status(400).json({
        message: 'update employee uncomplete',
        error: e
      })
    })
}

exports.allEmployee = (req, res) => {
  EmployeeModel.find().then(data => {
    res.status(200).json(data)
  })
}

exports.deleteEmployee = (req, res) => {
  const id = req.body.id

  EmployeeModel.findOneAndDelete({ _id: id }).then(emp => {
    addLog('60dff0bf708d771ce8b1c7c1', `delete employee => ${emp.fname} ${emp.lname}`)
      res.status(200).json({
          message:"delete employee complete"
      })
  }).catch(e=>{
    res.status(400).json({
        message: 'delete employee uncomplete',
        error: e
      })
  })
}
