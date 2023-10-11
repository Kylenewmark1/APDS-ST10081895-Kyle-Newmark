const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const { hasPassword } = require('../utils/hash');
const auth = require('../middleware/auth');

// Create a new user
router.post('/', async (req, res) => {
  try {
    // Validate the user input
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Check if the username is already taken
    const isUnique = await User.findOne({ username: req.body.username });
    if (isUnique) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the user's password
    const hashedPassword = await hasPassword(req.body.password);

    // Create a new user instance
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    // Save the new user to the database
    const savedUser = await user.save();

    res.status(201).json({
      message: 'User created-Sign In Success',
      user: savedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error!!!' });
  }
});

// Get current user details
router.get('/', auth, async (req, res) => {
  try {
    // The `auth` middleware ensures that the user is authenticated,
    // and their details are available in req.user
    res.json({ currentUser: req.user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error!!!' });
  }
});

module.exports = router;
