const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const {authUser,getUserProfile,registerUser} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.post('/login',authUser)
router.route('/profile').get(protect,getUserProfile)



module.exports = router