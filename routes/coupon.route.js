const express = require('express')
const { addCoupon, updateCoupon, deleteCoupon, allCoupon, getCouponByCodename } = require('../controllers/coupon.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/coupon',requireLogin,addCoupon)
router.put('/coupon/:id',requireLogin,updateCoupon)
router.delete('/coupon/:id',requireLogin,deleteCoupon)
router.get('/coupon',requireLogin,allCoupon)
router.get('/coupon/:codename',requireLogin,getCouponByCodename)

module.exports = router