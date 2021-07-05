const express = require('express')
const { login } = require('../controllers/authen.controller')
const router = express.Router()

router.post("/authen",login)
//router.post("/authen/logout",login)
router.get("/authen",(req,res)=>{
    res.send("HEYYYYYYYYYYYYYYYYY")
})

module.exports = router