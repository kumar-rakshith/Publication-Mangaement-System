// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.AdminToken; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = decoded; // Attach decoded user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};



const UserVerifyToken = (req, res, next) => {
  const token = req.cookies.token; // Get the token from cookies

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token
    req.user = decoded; // Attach decoded user info to the request object
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = verifyToken;
