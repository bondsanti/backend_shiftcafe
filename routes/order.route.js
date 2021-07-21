const express = require('express')
const { addOrder, updateOrder, deleteOrder, allOrder, holdOrder, getOrderById } = require('../controllers/order.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/order',requireLogin,addOrder)
router.put('/order/:id',requireLogin,updateOrder)
router.delete('/order/:id',requireLogin,deleteOrder)
router.get('/order',requireLogin,allOrder)
router.get('/order-hold',requireLogin,holdOrder)
router.get('/order/:id',requireLogin,getOrderById)

module.exports = router