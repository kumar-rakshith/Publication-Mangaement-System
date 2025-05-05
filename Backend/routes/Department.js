const express = require('express');
const router = express.Router();
const connection = require('../config/db');  // Make sure to import your DB connection

// Route to get departments with publication count
// Route to retrieve all department names
router.get('/departments', (req, res) => {
  const query = `SELECT name AS department_name FROM departments`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results); // Send department names as JSON
  });
});

// Route to retrieve publication counts by department
router.get('/department-publications-count', (req, res) => {
  const role = req.query.role;  // Get the role from the query parameters
  if (!role) {
    return res.status(400).json({ error: 'Role is required.' });
  }

  const query = `
    SELECT 
        d.name AS department_name, 
        COUNT(p.publication_id) AS publication_count
    FROM 
        departments d
    LEFT JOIN 
        publications p ON d.department_id = p.department_id
    LEFT JOIN 
        reviewerworkflow rw ON rw.publication_id = p.publication_id
    WHERE 
        rw.${role}_status = 'pending'
    GROUP BY 
        d.department_id
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching departments with publication counts:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);  // Send department publication counts as JSON
  });
});





// Route to get publications for a specific department
router.get('/:departmentName/publications', (req, res) => {
  const { departmentName } = req.params;  // Get department name from route parameter
  const role = req.query.role;  // Get role from query parameters
  
  if (!role) {
    return res.status(400).json({ error: 'Role is required.' });
  }

  // Initialize the condition for the query
  let roleCondition = '';

  if (role === 'reviewer1') {
    roleCondition = "rw.reviewer1_status = 'pending'";
  } else if (role === 'reviewer2') {
    roleCondition = "rw.reviewer1_status != 'pending' AND rw.reviewer2_status = 'pending'";
  } else if (role === 'reviewer3') {
    roleCondition = "(rw.reviewer1_status != 'pending' AND rw.reviewer2_status != 'pending' AND rw.reviewer3_status = 'pending')";
  } else if (role === 'principal' || role === 'director') {
    roleCondition = "(rw.reviewer1_status != 'pending' AND rw.reviewer2_status != 'pending' AND rw.reviewer3_status != 'pending')";
  }

  const query = `
    SELECT 
        p.publication_id,
        p.title,
        p.author_name,
        p.co_authors,
        p.publication_type,
        p.publication_date,
        p.fee,
        p.description,
        p.file_path
    FROM 
        publications p
    JOIN
        departments d ON p.department_id = d.department_id
    LEFT JOIN 
        reviewerworkflow rw ON rw.publication_id = p.publication_id
    WHERE 
        d.name = ? AND ${roleCondition};
  `;
  
  // Execute query to fetch publications for the department with role-based filtering
  connection.query(query, [departmentName], (err, results) => {
    if (err) {
      console.error('Error fetching publications:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);  // Send the publications data as JSON
  });
});



  // Route to get a single publication by its ID
  router.get('/:publication_id', (req, res) => {
    const { publication_id } = req.params;

    console.log('Fetching details for publication ID:', publication_id);
  
    // Query to get the publication by ID
    const query = 'SELECT * FROM publications WHERE publication_id = ?';
    connection.query(query, [publication_id], (err, results) => {
      if (err) {
        console.error('Error fetching publication details:', err);
        return res.status(500).json({ message: 'Error fetching publication details' });
      }
  
      if (results.length === 0) {
        return res.status(404).json({ message: 'Publication not found' });
      }
  
      res.json(results[0]); // Send the first (and only) result as JSON
    });
  });
  

module.exports = router;
