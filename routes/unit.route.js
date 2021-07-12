const express = require('express')
const { addUnit, updateUnit, deleteUnit } = require('../controllers/unit.controller')
const { requireLogin,requireAdmin } = require('../middleware')
const router = express.Router()

router.post("/unit",requireLogin,addUnit)
router.put("/unit/:id",requireLogin,updateUnit)
router.delete("/unit/:id",requireLogin,deleteUnit)

module.exports = router