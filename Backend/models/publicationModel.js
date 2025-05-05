// models/publicationModel.js
const db = require('../config/db.js'); // Your database connection

// Function to insert publication into the database
exports.createPublication = async (publication) => {
  const query = `
    INSERT INTO Publications (
      user_id,
      department_id,
      title,
      author_name,
      co_authors,
      publication_type,
      conference_name,
      publication_date,
      fee,
      file_path,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    publication.user_id,
    publication.department_id,
    publication.title,
    publication.author_name,
    publication.co_authors || null,
    publication.publication_type,
    publication.conference_name || null,
    publication.publication_date,
    publication.fee,
    publication.file_path,
    publication.status,
  ];

  return db.query(query, values);
};
