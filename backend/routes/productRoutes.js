const express = require('express')
const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const router = express.Router()

// @desc     FETCH all product
// @route    GET /api/products
// @access   Public
router.get('/', asyncHandler(async (req,res) => {
    const products = await Product.find({})
    res.json(products)
}))

// @desc     FETCH single product
// @route    GET /api/products/:id
// @access   Public
router.get('/:id', asyncHandler (async(req,res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({
                message: "Product not found",
            });
        }
    } else {
        res.status(404).json({
            message: "Invalid ID. Product not found",
        });
    }
}))


module.exports = router