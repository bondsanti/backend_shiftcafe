const bcrypt = require('bcrypt')
const { addLog } = require('./addLog.controller')
const EmployeeModel = require('./../models/employee.model')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')

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
      res.status(CODE_COMPLETE).json({
        message: 'add employee complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'add employee uncomplete',
        error: e
      })
    })
}

exports.updateEmployee = async (req, res) => {
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

  EmployeeModel.findByIdAndUpdate({ _id: req.params.id }, newEmpObj)
    .then(emp => {
      addLog(
        '60dff0bf708d771ce8b1c7c1',
        `update employee => ${emp.fname} ${emp.lname}`
      )

      res.status(CODE_COMPLETE).json({
        message: 'update employee complete'
      })
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'update employee uncomplete',
        error: e
      })
    })
}

exports.allEmployee = (req, res) => {
  EmployeeModel.find()
    .populate('ref_id_role')
    .then(Emp => {
      res.status(CODE_COMPLETE).json(Emp)
    })
}

exports.deleteEmployee = (req, res) => {
  //console.log(req.params.id)
  const id = req.params.id

  if (id) {
    EmployeeModel.findOneAndDelete({ _id: id })
      .then(emp => {
        addLog(
          '60dff0bf708d771ce8b1c7c1',
          `delete employee => ${emp.fname} ${emp.lname}`
        )
        res.status(CODE_COMPLETE).json({
          message: 'delete employee complete'
        })
      })
      .catch(e => {
        res.status(CODE_WARNING).json({
          message: 'delete employee uncomplete',
          error: e
        })
      })
  } else {
    res.status(CODE_WARNING).json({
      message: 'id is undefinded'
    })
  }
}
