const jwt = require('jsonwebtoken')
const { CODE_WARNING } = require('../instant')
const RoleModel = require('./../models/role.model')

exports.requireLogin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)
      req.user = user
      next()
    } catch (e) {
      return res.status(CODE_WARNING).json({ message: e })
    }
  } else {
    return res.status(CODE_WARNING).json({ message: 'Authorization is required' })
  }
}

exports.requireAdmin = async(req,res,next)=>{
  const role = await RoleModel.findById({_id:req.user.role})
  if(role.position === 'admin' || role.position === 'manager'){
    next()
  }else{
    return res.status(CODE_WARNING).json({
      message:'Access only admin or manager'
    })
  }
}
