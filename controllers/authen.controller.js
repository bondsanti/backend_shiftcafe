const EmployeeModel = require('./../models/employee.model')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  EmployeeModel.findOne({ username: req.body.username }).exec((err, emp) => {
    if (err) return res.status(400).json({ message: err })
    if (emp) {
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
          employee: emp
        })
      } else {
        return res.status(201).json({
          message: 'Invalid password'
        })
      }
    } else {
      return res.status(201).json({ message: 'username not found' })
    }
  })
}

exports.logout = (req, res) => {
  //jwt.destroyed(process.env.JWT_SECRET)
  res.clearCookie('token')
  res.status(200).json({
    message: 'Logout successfully'
  })
}
