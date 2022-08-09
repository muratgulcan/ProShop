const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const {authUser,getUserProfile,registerUser,updateUserProfile,getUsers} = require('../controllers/userController')
const {protect,admin} = require('../middleware/authMiddleware')

router.route('/').post(registerUser).get(protect,admin,getUsers)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile)



module.exports = router