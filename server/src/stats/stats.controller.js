const Book = require("../books/book.model")
const Order = require("../orders/order.model")

/** @type {import("express").RequestHandler} */
const calcAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments()
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ])

    const trendingBookCount = await Book.aggregate([
      {
        $match: { trending: true },
      },
      {
        $count: "trendingBookCount",
      },
    ])

    const totalBooks = await Book.countDocuments()

    const monthlySales = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m",
              date: "$createdAt",
            },
          },
          totalSales: {
            $sum: "$totalPrice",
          },
          totalOrders: {
            $sum: 1,
          },
        }
      },
      {
        $sort: {
          $id: 1
        },
      },
    ])


    res.status(200)
      .send({
        totalOrders,
        totalSales: totalSales[0]?.totalSales || 0,
        trendingBookCount: trendingBookCount[0]?.trendingBookCount || 0,
        totalBooks,
        monthlySales,
      })


  } catch (error) {
    console.log("Error fetching the stats", error)
    res.status(500)
      .send({
        message: "Failed to fetch the admin stats"
      })
  }
}

module.exports = {
  calcAdminStats
}