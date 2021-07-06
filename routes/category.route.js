const express = require('express')
const { addCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')
const router = express.Router()

router.post("/category",addCategory)
router.put("/category/:id",updateCategory)
router.delete("/category/:id",deleteCategory)

module.exports = router