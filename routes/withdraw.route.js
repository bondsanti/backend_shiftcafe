const express = require('express')
const { addWithdraw, updateWithdraw, deleteWithdraw, allWithdraw } = require('../controllers/withdraw.controller')
const router = express.Router()
const { requireLogin } = require('../middleware')

router.post('/withdraw',requireLogin,addWithdraw)
router.put('/withdraw/:id',requireLogin,updateWithdraw)
router.delete('/withdraw/:id',requireLogin,deleteWithdraw)
router.get('/withdraw',requireLogin,allWithdraw)

module.exports = router