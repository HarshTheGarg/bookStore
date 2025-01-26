const Order = require("./order.model")

const createOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body)
    const savedOrder = await newOrder.save()
    res.status(200)
      .send({
        message: "Order places successfully",
        order: savedOrder,
      })
  } catch (error) {
    console.log("Failed to place order", error)
    res.status(500)
      .send({
        message: "Failed to place order",
        error,
      })
  }
}

const getOrdersByEmail = async (req, res) => {
  try {
    const {email} = req.params
    const orders = await Order.find({email}).sort({createdAt: -1})
    if (!orders) {
      res.status(404)
        .send({
          message: "No orders found"
        })
    }
    res.status(200)
      .send({
        message: "Orders found",
        orders,
      })
  } catch (error) {
    console.log("Failed to fetch order", error)
    res.status(500)
      .send({
        message: "Failed to fetch order",
        error,
      })
  }
}

module.exports = {
  createOrder,
  getOrdersByEmail,
}
