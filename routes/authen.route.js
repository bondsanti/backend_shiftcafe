const express = require('express')
const { login, logout } = require('../controllers/authen.controller')
const router = express.Router()

router.post("/authen/login",login)
router.post("/authen/logout",logout)

module.exports = router