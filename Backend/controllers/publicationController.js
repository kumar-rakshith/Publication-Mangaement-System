// controllers/publicationController.js
const path = require('path');
const fs = require('fs');
const publicationModel = require('../models/publicationModel.js');
const authenticateToken = require('../middleware/authMiddleware.js');
const connection = require('../config/db.js');

// Function to upload publication
exports.uploadPublication = async (req, res) => {
  // Destructure data from req.body
  const { title, author_name, co_authors, publication_type, conference_name, publication_date, fee } = req.body;
  const file = req.file;

  // Check if all required fields are provided
  if (!title || !author_name || !publication_type || !publication_date || !fee || !file) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Extract user information from JWT token
  const { userId, department } = req.user; // Get user_id and department from the JWT token

  // Check if userId and department are available
  if (!userId || !department) {
    return res.status(400).json({ message: 'Invalid user data' });
  }

  try {
    // Save the file to the server and get the file path
    const filePath = path.join('uploads', file.filename);
    console.log('File uploaded:', filePath);

    // Prepare the publication object
    const publication = {
      user_id: userId,
      department_id: department,
      title,
      author_name,
      co_authors,
      publication_type,
      conference_name,
      publication_date,
      fee,
      file_path: filePath,
      status: 'pending', // Default status
    };
    console.log("Publication Data:", publication);

    // Save the publication record in the database
    const result = await publicationModel.createPublication(publication);

    // Send success response
    res.status(201).json({
      message: 'Publication uploaded successfully',
      publicationId: result.insertId,
    });
  } catch (error) {
    // Log and return server error
    console.error('Error uploading publication:', error);
    res.status(500).json({ message: 'Server error during publication upload', error: error.message });
  }
};


// Controller to get the list of publications
exports.getPublications = (req, res) => {
  const query = 'SELECT * FROM publications ORDER BY publication_date DESC'; 
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
};

// Controller to get a specific publication by ID
exports.getPublicationDetails = (req, res) => {
  const publication_id = req.params.publication_id;
  const query = `
    SELECT * FROM publications
    WHERE publication_id = ?
  `;
  
  connection.query(query, [publication_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Publication not found' });
    }
    res.json(results[0]); 
  });
};
