const express = require('express')
const { login, logout, getUser, requestOTP, verifyOTP, login2 } = require('../controllers/authen.controller')
const { requireLogin, requireAdmin } = require('../middleware')
const router = express.Router()

router.post("/authen/login",login)
//router.post("/authen/login2",login2)
router.post("/authen/logout",requireLogin,logout)
router.get("/authen/user",requireLogin,getUser)
router.post("/authen/request-otp",requireLogin,requireAdmin,requestOTP)
router.post("/authen/verify-otp",requireLogin,requireAdmin,verifyOTP)

module.exports = router