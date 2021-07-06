const express = require('express')
const { addUnit, updateUnit, deleteUnit } = require('../controllers/unit.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post("/unit",requireLogin,addUnit)
router.put("/unit/:id",updateUnit)
router.delete("/unit/:id",deleteUnit)

module.exports = router