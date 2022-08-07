const asyncHandler = require('express-async-handler')
const Order = require('../models/orderModel')
const mongoose = require('mongoose');


// @desc     Create new order
// @route    GET /api/orders
// @access   Private
const addOrderItems = asyncHandler(async (req,res) => {
    const {orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice} = req.body
    if(orderItems && orderItems.length === 0 ){
        res.status(400)
        throw new Error('No order items')
    }else{
        const order = new Order({
            user:req.user._id,orderItems,shippingAddress,paymentMethod,itemsPrice,taxPrice,shippingPrice,totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const order = await Order.findById(req.params.id).populate('user','name email')
      if (order) {
        res.json(order)
      } else {
        res.status(404).json({
          message: "Order not found",
      });
      }
    }else {
      res.status(404).json({
          message: "Invalid ID. Order not found",
      });
  }
  })

module.exports = {addOrderItems,getOrderById}
