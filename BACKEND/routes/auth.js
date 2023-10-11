const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const { isValidPassword } = require('../utils/hash');
const jwt = require('jsonwebtoken');

// Login route
router.post('/', async (req, res) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username: req.body.username });

    // If the user does not exist, return an error
    if (!user) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    // Check if the provided password is valid
    const validPassword = await isValidPassword(req.body.password, user.password);

    // If the password is not valid, return an error
    if (!validPassword) {
      return res.status(401).json({ error: 'Incorrect username or password' });
    }

    // Generate a JWT token with the user's ID
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

    // Send the token as a response
    res.status(200).json({ token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
