const express = require('express')
const { addUnit, updateUnit, deleteUnit } = require('../controllers/unit.controller')
const router = express.Router()

router.post("/unit",addUnit)
router.put("/unit",updateUnit)
router.delete("/unit",deleteUnit)

module.exports = router