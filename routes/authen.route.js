const express = require('express')
const { login, logout, getUser, requestOTP, verifyOTP } = require('../controllers/authen.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post("/authen/login",login)
router.post("/authen/logout",logout)
router.get("/authen/user",requireLogin,getUser)
router.post("/authen/request-otp",requestOTP)
router.post("/authen/verify-otp",verifyOTP,(req,res)=>{
    res.json({
        message:"verify otp complete"
    })
})

module.exports = router