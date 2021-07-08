const express = require('express')
const { addStock, updateStock, deleteStock } = require('../controllers/stock.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/stock',requireLogin,addStock)
router.put('/stock/:id',requireLogin,updateStock)
router.delete('/stock/:id',requireLogin,deleteStock)

module.exports = router