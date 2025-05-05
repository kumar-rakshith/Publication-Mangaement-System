// modules/admin/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminModel = require('../models/adminModels.js');

exports.AdminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
   
    const results = await adminModel.findAdminByUsername(username);

   
    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    console.log(`Login attempt for username: ${user.username}, role: ${user.role}`);

   
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    
    res.cookie('AdminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
      maxAge: 3600000,  // Cookie expires after 1 hour
    });

   
    res.status(200).json({
      message: 'Login successful',
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
