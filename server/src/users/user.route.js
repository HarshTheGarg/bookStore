const express = require("express")
const { getUserAndToken } = require("./user.controller")
const router = express.Router()

router.post("/admin", getUserAndToken)

module.exports = router
