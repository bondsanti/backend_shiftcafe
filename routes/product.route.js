const express = require('express')
const { addProduct, updateProduct, deleteProduct, allProduct } = require('../controllers/product.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/product',requireLogin,addProduct)
router.put('/product/:id',requireLogin,updateProduct)
router.delete('/product/:id',requireLogin,deleteProduct)
router.get('/product',allProduct)

module.exports = router