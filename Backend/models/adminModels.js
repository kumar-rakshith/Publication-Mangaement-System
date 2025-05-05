// models/adminModel.js
const db = require('../config/db.js'); 

const findAdminByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM admins WHERE username = ?', [username], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  findAdminByUsername,
};
