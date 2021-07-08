const express = require('express')
const { addPointPayment } = require('../controllers/pointPayment.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/point-payment',requireLogin,addPointPayment)

module.exports = router