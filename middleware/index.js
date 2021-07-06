const jwt = require('jsonwebtoken')
const { CODE_COMPLETE, CODE_WARNING, CODE_ERROR } = require('../instant')

exports.requireLogin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      req.user = user
      next()
    } catch (e) {
      return res.status(CODE_ERROR).json({ message: e })
    }
  } else {
    return res.status(CODE_ERROR).json({ message: 'Authorization is required' })
  }
}
