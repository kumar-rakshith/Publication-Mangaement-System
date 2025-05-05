// Routes/ userRoutes 

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authenticateToken = require('../middleware/authMiddleware.js')


router.post('/userLogin', userController.userLogin , authenticateToken);


module.exports = router;
