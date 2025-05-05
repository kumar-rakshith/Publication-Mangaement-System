// index.js

const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const adminRoute = require('./routes/adminRoutes.js');
const userRoute = require('./routes/userRoutes.js');
const publicationRoutes = require('./routes/publicationRoutes.js');
const DepartmentRoutes = require('./routes/Department.js');

dotenv.config();

const app = express();

// CORS Configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, 
};

app.use(cors(corsOptions)); 

// Middleware

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads')); 

// Routes
app.use('/api/auth', adminRoute);
app.use('/api/auth', userRoute);
app.use('/api/publications', publicationRoutes);
app.use('/api/publications', DepartmentRoutes);
app.use('/api/userpublications', DepartmentRoutes);




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
