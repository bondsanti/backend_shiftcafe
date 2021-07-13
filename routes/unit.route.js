const express = require('express')
const { addUnit, updateUnit, deleteUnit, allUnit } = require('../controllers/unit.controller')
const { requireLogin,requireAdmin } = require('../middleware')
const router = express.Router()

router.post("/unit",requireLogin,addUnit)
router.put("/unit/:id",requireLogin,updateUnit)
router.delete("/unit/:id",requireLogin,deleteUnit)
router.get("/unit",requireLogin,allUnit)

module.exports = router