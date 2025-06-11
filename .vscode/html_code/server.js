// I used ai for this database part
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'yourUsername',
  password: 'yourPassword',
  database: 'testdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Create table if it doesn't exist
db.query(`CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255)
)`);

// Handle form submission
app.post('/submit', (req, res) => {
  const username = req.body.username;
  db.query('INSERT INTO users (username) VALUES (?)', [username], (err) => {
    if (err) throw err;
    res.send('Thanks! Your name was saved.');
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
