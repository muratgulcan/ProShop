const asyncHandler = require('express-async-handler')
const Product = require('../models/productModel')
const mongoose = require('mongoose');


// @desc     FETCH all product
// @route    GET /api/products
// @access   Public
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc     FETCH single product
// @route    GET /api/products/:id
// @access   Public
const getProductById = asyncHandler(async (req,res) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({
                message: "Product not found.",
            });
        }
    } else {
        res.status(404).json({
            message: "Invalid ID. Product not found.",
        });
    }
})

// @desc     Delete product by id
// @route    DELETE /api/products/:id
// @access   Private/Admin
const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        await product.remove()
        res.json({message:'Product removed.'})
    }else{
        res.status(404)
        throw new Error('Product not found.')
    }
})

module.exports = {getProductById,getProducts,deleteProduct}