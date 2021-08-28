const express = require('express')
const { addCategory, updateCategory, deleteCategory, allCategory, toppingCategory } = require('../controllers/category.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post("/category",requireLogin,addCategory)
router.post("/category-topping/:id",requireLogin,toppingCategory)
router.put("/category/:id",requireLogin,updateCategory)
router.delete("/category/:id",requireLogin,deleteCategory)
router.get("/category",requireLogin,allCategory)

module.exports = router