// routes/publicationRoutes.js
const express = require('express');
const router = express.Router();
const  authenticateToken  = require('../middleware/authMiddleware.js');
const upload = require('../middleware/fileUploadMiddleware.js');
const publicationController = require('../controllers/publicationController.js');
const { connect } = require('../config/db.js');
const connection = require('../config/db.js');

// POST route to upload a publication
router.post('/upload', authenticateToken, upload.single('file'), publicationController.uploadPublication);

// GET route to fetch all publications
router.get('/view', publicationController.getPublications);

// GET route to fetch a publication by its ID
router.get('/:publication_id', publicationController.getPublicationDetails);


router.get('/view', (req, res) => {
    const query = 'SELECT * FROM publications ORDER BY publication_date DESC'; // Sorting by newest first
    connection.query(query, (err, results) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(results); // Send publications as JSON response
    });
  });


  router.get('/:publication_id', (req, res) => {
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
        res.json(results[0]); // Send the first (and only) result as JSON
    });
});



router.post('/update-status', async (req, res) => {
  const { publication_id, status, recommended_fee, comment, approved_by, role } = req.body;

  // Check if required fields are missing
  if (!publication_id || !status || !approved_by || !role) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const reviewQuery = `
    INSERT INTO reviews (publication_id, status, approved_by, role, recommended_fee, comment)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const workflowUpdateQuery = `
    UPDATE reviewerworkflow 
    SET 
      ${role}_status = ?
    WHERE publication_id = ?
  `;

  try {
    // Start a transaction to ensure both operations are done atomically
    await connection.beginTransaction();

    // Execute query to insert review details into the database
    await connection.query(reviewQuery, [publication_id, status, approved_by, role, recommended_fee, comment]);

    // Update the reviewer workflow table based on the role
    await connection.query(workflowUpdateQuery, [status, publication_id]);

    // Commit the transaction
    await connection.commit();

    return res.status(200).json({ message: 'Publication status updated successfully' });
  } catch (error) {
    // If something goes wrong, rollback the transaction
    await connection.rollback();
    console.error(error);
    return res.status(500).json({ message: 'Error updating publication status' });
  }
});

// Route to get publications for a specific user
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const query = 'SELECT * FROM publications WHERE user_id = ? ORDER BY publication_id ASC';
    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error fetching publications' });
      }
      res.json(results);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



router.get('/status/:publicationId', (req, res) => {
  const publicationId = req.params.publicationId;

  try {
    // Query to get status details from the reviews table based on publication_id
    const query = 'SELECT * FROM reviews WHERE publication_id = ?';
    connection.query(query, [publicationId], (err, results) => {
      if (err) {
        console.error('Error fetching publication status:', err);
        return res.status(500).json({ message: 'Server error' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ message: 'Publication status not found' });
      }

      // Send the retrieved status information back to the frontend
      res.status(200).json(results[0]); // Sending the first status record (you can adjust this as necessary)
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
