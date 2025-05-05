const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
const verifyToken = require('../middleware/authMiddleware2.js');

router.post('/adminLogin', adminController.AdminLogin);

router.get('/admindetails', verifyToken, (req, res) => {
  console.log('Decoded user data from token:', req.user);
  // Now that we have the decoded user info attached to req.user, we can use it
  const { username, role, admin_id } = req.user;
  
  // Respond with the admin's details
  res.json({ username, role, admin_id });
});
  

module.exports = router;
