const EmployeeModel = require('./../models/employee.model')
const jwt = require('jsonwebtoken')

exports.login = (req, res) => {
  EmployeeModel.findOne({ username: req.body.username }).exec((err, emp) => {
    if (err) return res.status(400).json({ message: err })
    if (emp) {
      if (emp.authenticate(req.body.password) ) {
        const token = jwt.sign(
          { _id: emp._id, role: emp.ref_id_role },
          process.env.JWT_SECRET,
          {
            expiresIn: '24h'
          }
        )

        
        req.emp = token
        res.cookie('token', token, { expiresIn: '24h' })
        res.status(200).json({
          token,
          employee:emp
        })
      } else {
        return res.status(200).json({
          message: 'Invalid password'
        })
      }
    } else {
      return res.status(400).json({ message: 'username not found' })
    }
  })
}
