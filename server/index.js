const express = require("express")
const app = express()
const mongoose = require("mongoose")

const bookRouter = require("./src/books/book.route")
const orderRouter = require("./src/orders/order.route")
const userRouter = require("./src/users/user.route")
const statsRouter = require("./src/stats/stats.route")

require('dotenv').config()

app.use(express.json())

const cors = require('cors')
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost"],
  credentials: true,
}))


// Connect to the database
async function main() {
  await mongoose.connect(process.env.MONGO_SERVER)
}

main()
  .then(() => console.log("Connected to the Database"))
  .catch(err => console.log(err))

// app.get("/", (req, res) => {
//   res.send("HELLO WORLD")
// })

app.use("/api/books", bookRouter)
app.use("/api/orders", orderRouter)
app.use("/api/auth", userRouter)
app.use("/api/admin", statsRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})