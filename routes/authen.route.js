const express = require('express')
const { login, logout } = require('../controllers/authen.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post("/authen/login",login)
router.post("/authen/logout",logout)
router.get("/authen/user",requireLogin,(req,res)=>{
    res.status(200).json({
        user:req.user
    })
})

module.exports = router