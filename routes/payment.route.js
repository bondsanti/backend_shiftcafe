const express = require('express')
const { addPayment, updatePayment, deletePayment, allPayment } = require('../controllers/payment.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/payment',requireLogin,addPayment)
router.put('/payment/:id',requireLogin,updatePayment)
router.delete('/payment/:id',requireLogin,deletePayment)
router.get('/payment',requireLogin,allPayment)

module.exports = router