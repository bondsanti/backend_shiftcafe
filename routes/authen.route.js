const express = require('express')
const { login, logout, getUser, requestOTP, verifyOTP, login2 } = require('../controllers/authen.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post("/authen/login",login)
//router.post("/authen/login2",login2)
router.post("/authen/logout",logout)
router.get("/authen/user",requireLogin,getUser)
router.post("/authen/request-otp",requestOTP)
router.post("/authen/verify-otp",verifyOTP)

module.exports = router