const express = require('express')
const { addProduct, updateProduct, deleteProduct, allProduct, showProduct, updateProduct2 } = require('../controllers/product.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post('/product',requireLogin,addProduct)
router.put('/product/:id',requireLogin,updateProduct)
router.put('/product2/:id',requireLogin,updateProduct2)
router.delete('/product/:id',requireLogin,deleteProduct)
router.get('/product',allProduct)
router.get('/product-show',showProduct)

module.exports = router