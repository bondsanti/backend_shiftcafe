const express = require('express')
const { addWithdraw, updateWithdraw, deleteWithdraw } = require('../controllers/withdraw.controller')
const router = express.Router()
const { requireLogin } = require('../middleware')

router.post('/withdraw',requireLogin,addWithdraw)
router.put('/withdraw/:id',requireLogin,updateWithdraw)
router.delete('/withdraw/:id',requireLogin,deleteWithdraw)

module.exports = router