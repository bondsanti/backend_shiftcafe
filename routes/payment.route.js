const express = require('express')
const { addPayment, updatePayment, deletePayment } = require('../controllers/payment.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/payment',requireLogin,addPayment)
router.put('/payment/:id',requireLogin,updatePayment)
router.delete('/payment/:id',requireLogin,deletePayment)

module.exports = router