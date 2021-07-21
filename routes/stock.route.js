const express = require('express')
const { addStock, updateStock, deleteStock, allStock, allStockByProductId } = require('../controllers/stock.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/stock',requireLogin,addStock)
router.put('/stock/:id',requireLogin,updateStock)
router.delete('/stock/:id',requireLogin,deleteStock)
router.get('/stock',requireLogin,allStock)
router.get('/stock/:id',requireLogin,allStockByProductId)

module.exports = router