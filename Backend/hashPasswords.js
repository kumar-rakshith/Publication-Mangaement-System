const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise'); // Use the promise-based version of mysql2

async function hashUserPasswords() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'myapp' // Change this to the actual database name
  });

  try {
    // Select user_id and password columns from the Users table
    const [users] = await db.query("SELECT user_id, username, password FROM Users");

    for (const user of users) {
      // Check if the password is already hashed
      if (!bcrypt.getRounds(user.password)) {
        // Hash the plain-text password
        const hashedPassword = await bcrypt.hash(user.password, 10);

        // Update the hashed password in the database
        await db.query("UPDATE Users SET password = ? WHERE user_id = ?", [hashedPassword, user.user_id]);
        console.log(`Password for user ID ${user.user_id} has been hashed.`);
      } else {
        console.log(`Password for user ID ${user.user_id} is already hashed.`);
      }
    }

    console.log("User password hashing completed.");
  } catch (error) {
    console.error("Error hashing user passwords:", error);
  } finally {
    await db.end(); // Close the database connection
  }
}

hashUserPasswords();
