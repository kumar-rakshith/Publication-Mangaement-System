//controllers/userController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels.js');

exports.userLogin = async (req, res) => {
    const { username, password } = req.body;

    try {

        const results = await userModel.findUserByUsername(username);

        console.log(results);
        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = results[0];
        console.log(results[0]); // Should show an object with user properties


        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }


        const token = jwt.sign(
            { userId: user.user_id, username: user.username, department: user.department_id },
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );


        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
            maxAge: 300000,  // Cookie expires after 1 hour
        });


        res.status(200).json({
            message: 'Login successful',
            user: { userId: user.user_id, username: user.username, department: user.department_id },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
