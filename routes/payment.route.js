const express = require('express')
const {
  addPayment,
  updatePayment,
  deletePayment,
  allPayment,
  getPaymentByIdCustomer,
  getPaymentById,
  getPaymentByToday,
  getPaymentByMonth,
  getPaymentByYear
} = require('../controllers/payment.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/payment', requireLogin, addPayment)
router.put('/payment/:id', requireLogin, updatePayment)
router.delete('/payment/:id', requireLogin, deletePayment)
router.get('/payment', requireLogin, allPayment)
router.get('/payment/customer/:id', requireLogin, getPaymentByIdCustomer)
router.get('/payment/:id', requireLogin, getPaymentById)
router.get('/payment-today', requireLogin, getPaymentByToday)
router.get('/payment-month', requireLogin, getPaymentByMonth)
router.get('/payment-year', requireLogin, getPaymentByYear)

module.exports = router
