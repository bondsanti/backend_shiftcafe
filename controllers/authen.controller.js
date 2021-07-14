const EmployeeModel = require('./../models/employee.model')
const CustomerModel = require('./../models/customer.model')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
  // EmployeeModel.findOne({ username: req.body.username }).exec((err, emp) => {
  //   if (err) return res.status(400).json({ message: err })
  //   if (emp) {
  //     if (emp.authenticate(req.body.password)) {
  //       const token = jwt.sign(
  //         { _id: emp._id, role: emp.ref_id_role },
  //         process.env.JWT_SECRET,
  //         {
  //           expiresIn: '15d'
  //         }
  //       )

  //       res.cookie('token', token, { expiresIn: '15d' })
  //       res.status(200).json({
  //         token,
  //         message: 'login complete'
  //       })
  //     } else {
  //       return res.status(201).json({
  //         message: 'Invalid password'
  //       })
  //     }
  //   } else {
  //     CustomerModel.findOne({ tel: req.body.username })
  //       .then(cus => {
  //         if (req.body.password == cus.tel) {
  //           const token = jwt.sign(
  //             { _id: cus._id, role: 'member' },
  //             process.env.JWT_SECRET,
  //             {
  //               expiresIn: '15d'
  //             }
  //           )

  //           res.cookie('token', token, { expiresIn: '15d' })
  //           res.status(200).json({
  //             token,
  //             message: 'login complete'
  //           })
  //         } else {
  //           res.status(201).json({
  //             message: 'Incorrect password'
  //           })
  //         }
  //       })
  //       .then(e => {
  //         res.status(201).json({
  //           message: 'username not found',
  //           error: e
  //         })
  //       })
  //   }
  // })

  try {
    const emp = await EmployeeModel.findOne({ username: req.body.username })
    if (emp !== null) {
      if (emp.authenticate(req.body.password)) {
        const token = jwt.sign(
          { _id: emp._id, role: emp.ref_id_role },
          process.env.JWT_SECRET,
          {
            expiresIn: '15d'
          }
        )

        res.cookie('token', token, { expiresIn: '15d' })
        res.status(200).json({
          token,
          message: 'login complete'
        })
      } else {
        res.status(201).json({
          message: 'Invalid password'
        })
      }
    } else {
      CustomerModel.findOne({ tel: req.body.username })
        .then(cus => {
          if (req.body.password == cus.tel) {
            const token = jwt.sign(
              { _id: cus._id, role: 'member' },
              process.env.JWT_SECRET,
              {
                expiresIn: '15d'
              }
            )

            res.cookie('token', token, { expiresIn: '15d' })
            res.status(200).json({
              token,
              message: 'login complete'
            })
          } else {
            res.status(201).json({
              message: 'Incorrect password'
            })
          }
        })
        .catch(e => {
          res.status(201).json({
            message: 'username not found',
            error: e
          })
        })
    }
  } catch (e) {
    console.log(e)
  }

  // CustomerModel.findOne({ tel: req.body.username })
  //       .then(cus => {
  //         if (req.body.password == cus.tel) {
  //           const token = jwt.sign(
  //             { _id: cus._id, role: 'member' },
  //             process.env.JWT_SECRET,
  //             {
  //               expiresIn: '15d'
  //             }
  //           )

  //           res.cookie('token', token, { expiresIn: '15d' })
  //           res.status(200).json({
  //             token,
  //             message: 'login complete'
  //           })
  //         } else {
  //           res.status(201).json({
  //             message: 'Incorrect password'
  //           })
  //         }
  //       })
  //       .then(e => {
  //         res.status(201).json({
  //           message: 'username not found',
  //           error: e
  //         })
  //       })
}

exports.logout = (req, res) => {
  res.clearCookie('token')
  res.status(200).json({
    message: 'Logout successfully'
  })
}

exports.getUser = async (req, res) => {
  // EmployeeModel.findById({ _id: req.user._id })
  //   .populate('ref_id_role')
  //   .then(emp => {
  //     res.status(200).json({ user: emp })
  //   })
  //   .catch(async () => {
  //     const cus = await CustomerModel.findById({ _id: req.user._id })
  //     res
  //       .status(200)
  //       .json({ user: { ...cus, ref_id_role: { position: 'member' } } })
  //   })

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
