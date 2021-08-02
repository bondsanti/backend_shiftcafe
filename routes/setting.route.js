const express = require('express')
const { addSetting, updateSetting, allSetting } = require('../controllers/setting.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()
router.post('/setting',requireLogin,addSetting)
router.put('/setting/:id',requireLogin,updateSetting)
router.get('/setting',requireLogin,allSetting)

module.exports = router