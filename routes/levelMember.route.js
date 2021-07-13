const express = require('express')
const { addLevelMember, updateLevelMember, deleteLevelMember, allLevelMember } = require('../controllers/levelMember.controller')
const { requireLogin } = require('../middleware')
const router = express.Router()

router.post("/level-member",requireLogin,addLevelMember)
router.put("/level-member/:id",requireLogin,updateLevelMember)
router.delete("/level-member/:id",requireLogin,deleteLevelMember)
router.get("/level-member",requireLogin,allLevelMember)

module.exports = router