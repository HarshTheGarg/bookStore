const User = require("./user.model")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

const getUserAndToken = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username })

    if (!user || user.password != password) {
      res.status(401)
        .send({
          message: "Invalid User"
        })
    }
    const token = jwt.sign(
      {
        id: user._id, username, role: user.role
      }, 
      jwtSecret, 
      {
        expiresIn: "1d"
      }
    )

    res.status(200)
      .send({
        message: "Authentication Success",
        token,
        tokenTime: 1 * 24 * 60 * 60 * 1000,
        user,
      })

  } catch (error) {
    console.error("Failed to login as user", error)
    res.status(500)
      .send({
        message: "Failed to login as user"
      })
  }
}

module.exports = {
  getUserAndToken,
}