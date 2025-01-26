const Book = require("./book.model")

const postBook = async (req, res) => {
  try {
    const newBook = await Book(req.body)
    await newBook.save()
    res
      .status(200)
      .send({
      message: "Book posted successfully",
      book: newBook,
    })
  } catch (error) {
    console.error("Error Creating book", error)
    res
      .status(500)
      .send({
        message: "Failed to add book",
        error,
      })
  }
}

const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({createdAt: -1})
    if ( !books ) {
      res.status(404)
        .send({
          message: "No books found"
        })
    }else {
      res.status(200)
        .send({
          message: "Books Found",
          books,
        })
    }
  } catch (error) {
    console.error("Error Fetching books", error)
    res
      .status(500)
      .send({
        message: "Failed to fetch books",
        error,
      })
  }
}

const getSingleBook = async (req, res) => {
  try {
    const {id} = req.params
    const book = await Book.findById(id)
    if ( !book ) {
      res.status(404)
        .send({
          message: "Book not found"
        })
    } else {
      res.status(200)
        .send({
          message: "Book Found",
          book,
        })
    }
  } catch (error) {
    console.error("Error Fetching books", error)
    res.status(404)
        .send({
          message: "Book Not Found",
        })
  }
}

const updateBook = async (req, res) => {
  try {
    const {id} = req.params
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new:true})

    res.status(200)
      .send({
        message: "Book updated successfully",
        book: updatedBook
      })

  } catch (error) {
    console.error("Error Updating book", error)
    res
      .status(500)
      .send({
        message: "Failed to update book",
        error,
      })
  }
}

const deleteBook = async (req, res) => {
  try {
    const {id} = req.params
    const deletedBook = await Book.findByIdAndDelete(id)

    if (!deletedBook) {
      res.status(404)
        .send({
          message: "Book not found"
        })
    } else {
      res.status(200)
        .send({
          message: "Book deleted successfully",
          book: deletedBook,
        })
    }
  } catch (error) {
    console.error("Error Deleting book", error)
    res
      .status(500)
      .send({
        message: "Failed to delete book",
        error,
      })
  }
}

module.exports = {
  postBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}