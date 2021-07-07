const express = require('express')
const { addCoupon, updateCoupon, deleteCoupon } = require('../controllers/coupon.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/coupon',requireLogin,addCoupon)
router.put('/coupon/:id',requireLogin,updateCoupon)
router.delete('/coupon/:id',requireLogin,deleteCoupon)

module.exports = router