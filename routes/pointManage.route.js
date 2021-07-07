const express = require('express')
const { addPointManage } = require('../controllers/pointManage.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/point-manage',requireLogin,addPointManage)

module.exports = router