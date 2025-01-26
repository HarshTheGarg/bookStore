const { default: mongoose } = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  trending: {
    type: Boolean,
    requried: true,
  },
  coverImage: {
    type: String,
    requred: true,
  },
  author: {
    type: String,
  },
  oldPrice: {
    type: Number,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  timestamps: true,
})

const Book = mongoose.model("book", bookSchema)
module.exports = Book
