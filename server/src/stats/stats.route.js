const express = require('express')
const { calcAdminStats } = require('./stats.controller')
const router = express.Router()

router.get("/", calcAdminStats)

module.exports = router
