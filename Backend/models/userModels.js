// models/UserModel.js

const db = require('../config/db.js'); 

const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = {
  findUserByUsername,
};
