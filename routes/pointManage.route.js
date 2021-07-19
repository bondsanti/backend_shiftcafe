const express = require('express')
const { addPointManage, allPointManage, allPointManageByCustomerId } = require('../controllers/pointManage.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/point-manage',requireLogin,addPointManage)
router.get('/point-manage',allPointManage)
router.get('/point-manage/customer/:id',allPointManageByCustomerId)

module.exports = router