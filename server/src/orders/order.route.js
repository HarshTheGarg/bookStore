const express = require("express")
const { createOrder, getOrdersByEmail } = require("./order.controller")
const router = express.Router()

router.post("/", createOrder)

router.get("/email/:email", getOrdersByEmail)

module.exports = router
