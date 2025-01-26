const jwt = require("jsonwebtoken")
require("dotenv").config()
const jwtSecret = process.env.JWT_SECRET

const verifyToken = (req, res, next) => {
  const token = req.headers["Authentication"]?.split(" ")[1]
  if (!token) {
    res.status(401)
      .send({
        message: "Access Denied, no token found"
      })
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if(err) {
      res.status(403)
        .send({
          message: "Invalid Credentials",
        })
    }

    req.user = user
    next()
  })
}

const verifyAdminToken = (req, res, next) => {
  const token = req.headers["authentication"]?.split(" ")[1]
  if (!token) {
    res.status(401)
      .send({
        message: "Access Denied, no token found"
      })
  }

  jwt.verify(token, jwtSecret, (err, user) => {
    if(err) {
      res.status(403)
        .send({
          message: "Invalid Credentials",
        })
    }
    if (user.role != "admin") {
      res.status(401)
        .send({
          message: "Access Denied"
        })
    }
    req.user = user
    next()
  })
}

module.exports = { 
  verifyToken,
  verifyAdminToken,
}
