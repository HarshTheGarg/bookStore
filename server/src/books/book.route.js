const express = require('express')
const router = express.Router()
const { postBook, getBooks, getSingleBook, updateBook, deleteBook } = require('./book.controller')
const { verifyAdminToken } = require('../middleware/verifyToken')

router.post("/", verifyAdminToken, postBook)

router.get("/", getBooks)

router.get("/:id", getSingleBook)

router.put("/:id", verifyAdminToken, updateBook)

router.delete("/:id", verifyAdminToken, deleteBook)

module.exports = router
