const express = require('express')
const { login, logout, getUser } = require('../controllers/authen.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post("/authen/login",login)
router.post("/authen/logout",logout)
router.get("/authen/user",requireLogin,getUser)

module.exports = router