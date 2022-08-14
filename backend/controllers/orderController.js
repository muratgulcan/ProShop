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
    if((req.user._id).toString() === (order.user._id).toString()){
      if (order) {
        res.json(order)
      } else {
        res.status(404).json({
          message: "Order not found",
        });
      }
    }else {
      res.status(404).json({
          message: "Oops...",
      });
    }
  }else {
    res.status(404).json({
        message: "Invalid ID. Order not found",
    });
  }
})

// @desc    Uodate order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const order = await Order.findById(req.params.id)
    if (order) {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id:req.body.id,
        status:req.body.status,
        update_time:req.body.update_time,
        email_address:req.body.payer.email
      }
      const updateOrder = await order.save()
      res.json(updateOrder)
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

// @desc    Get logged in user orders
// @route   PUT /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get all orders
// @route   PUT /api/orders
// @access  Private
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user','id name')
  res.json(orders)
})



module.exports = {addOrderItems,getOrderById,updateOrderToPaid,getMyOrders,getOrders}
