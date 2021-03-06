const EmployeeModel = require('./../models/employee.model')
const CustomerModel = require('./../models/customer.model')
const jwt = require('jsonwebtoken')
const thaibulksmsApi = require('thaibulksms-api')
const { CODE_COMPLETE, CODE_WARNING } = require('../instant')
const { addLog } = require('./addLog.controller')

exports.login = async (req, res) => {
  try {
    const emp = await EmployeeModel.findOne({ username: req.body.username })
    if (emp !== null) {
      if(req.body.type === 0){

        if (emp.authenticate(req.body.password)) {
          const token = jwt.sign(
            { _id: emp._id, role: emp.ref_id_role },
            process.env.JWT_SECRET,
            {
              expiresIn: '1d'
            }
          )
          await addLog(emp._id, `เข้าสู่ระบบ`)
          res.cookie('token', token, { expiresIn: '1d' })
          res.status(200).json({
            token,
            message: 'เข้าสู่ระบบสำเร็จ'
          })
        } else {
          res.status(201).json({
            message: 'รหัสผ่านไม่ถูกต้อง'
          })
        }
      }else{
        const token = jwt.sign(
          { _id: emp._id, role: emp.ref_id_role },
          process.env.JWT_SECRET,
          {
            expiresIn: '1d'
          }
        )

        res.cookie('token', token, { expiresIn: '1d' })
        res.status(200).json({
          token,
          message: 'เข้าสู่ระบบสำเร็จ'
        })
      }
    } else {
      CustomerModel.findOne({ tel: req.body.username })
        .then(cus => {
          const password = cus.tel === cus.password ? cus.tel : cus.password
          if (req.body.password == password) {
            const token = jwt.sign(
              { _id: cus._id, role: 'member' },
              process.env.JWT_SECRET,
              {
                expiresIn: '1d'
              }
            )

            res.cookie('token', token, { expiresIn: '1d' })
            res.status(200).json({
              token,
              message: 'เข้าสู่ระบบสำเร็จ'
            })
          } else {
            res.status(201).json({
              message: 'รหัสผ่านผิดพลาด'
            })
          }
        })
        .catch(e => {
          res.status(201).json({
            message: 'ไม่พบชื่อผู้ใช้',
            error: e
          })
        })
    }
  } catch (e) {
    console.log(e)
  }
}

exports.logout =async (req, res) => {
  await addLog(req.user._id, `ออกจากระบบ`)
  req.user = null
  res.clearCookie('token')
  res.status(200).json({
    message: 'ออกจากระบบเรียบร้อยแล้ว'
  })
}

exports.getUser = async (req, res) => {
  const emp = await EmployeeModel.findById({ _id: req.user._id }).populate(
    'ref_id_role'
  )
  if (emp !== null) {
    res.status(200).json({ user: emp })
  } else {
    await CustomerModel.findById({ _id: req.user._id }).then(cus => {
      const cusUser = {
        _id: cus._id,
        point: cus.point,
        datetime: cus.datetime,
        pname: cus.pname,
        fname: cus.fname,
        lname: cus.lname,
        birthday: cus.birthday,
        tel: cus.tel,
        email: cus.email,
        address: cus.address,
        ref_level_id: cus.ref_level_id,
        ref_id_role: { position: 'member' }
      }
      res.status(200).json({ user: cusUser })
    })
  }
}

const options = {
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET
}
const otp = thaibulksmsApi.otp(options)

exports.requestOTP = (req, res) => {
  otp
    .request(req.body.tel)
    .then(async(response) => {
     await addLog(req.user._id,`ร้องขอรหัส OTP ที่ส่งไปยังหมายเลขโทรศัพท์ ${req.body.tel}`)
      res.status(CODE_COMPLETE).json(response.data)
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'ส่ง OTP ไม่สำเร็จ',
        error: e
      })
    })
}

exports.verifyOTP = (req, res) => {
  otp
    .verify(req.body.verify, req.body.code)
    .then(async(response) => {
     await addLog(req.user._id,`ได้สวมสิทธิ์เป็นพนักงาน id:${req.body.emp_spoof._id} ชื่อ-นามสกุล:${req.body.emp_spoof.fname+" "+req.body.emp_spoof.lname}`)
      res.status(CODE_COMPLETE).json(response)
      //console.log(response.data)
      //next()
    })
    .catch(e => {
      res.status(CODE_WARNING).json({
        message: 'ตรวจสอบ OTP ไม่สำเร็จ',
        error: e
      })
    })
}
