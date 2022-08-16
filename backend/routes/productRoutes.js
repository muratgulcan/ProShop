const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const {getProducts,getProductById,deleteProduct,createProduct,updateProduct,createProductReview} = require('../controllers/productController')
const {protect,admin} = require('../middleware/authMiddleware')


router.route('/').get(getProducts).post(protect,admin,createProduct)
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).
put(protect,admin,updateProduct)
router.route('/:id/reviews').post(protect,createProductReview)



module.exports = router