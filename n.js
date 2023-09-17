const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// This is a mock database. In a real application, you would use a database like MongoDB or PostgreSQL.
const users = [];

// Registration endpoint
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the user's password
  const saltRounds = 10; // Number of rounds for the salt (adjust as needed)
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Store the username and hashed password in the database (in memory for this example)
    users.push({ username, password: hashedPassword });

    res.status(201).send('Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Registration failed');
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username (in a real app, you'd query your database)
  const user = users.find((u) => u.username === username);

  if (!user) {
    return res.status(401).send('User not found');
  }

  try {
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Login failed: Incorrect password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Login failed');
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
