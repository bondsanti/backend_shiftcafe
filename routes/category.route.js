const express = require('express')
const { addCategory, updateCategory } = require('../controllers/category.controller')
const router = express.Router()

router.post("/category",addCategory)
router.put("/category",updateCategory)

module.exports = router