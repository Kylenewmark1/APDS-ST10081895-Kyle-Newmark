const express = require('express');
const router = express.Router();
const { Post, validatePost } = require('../models/post');
const auth = require('../middleware/auth');

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new post
router.post('/', auth, async (req, res) => {
  try {
    const { error } = validatePost(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const post = new Post(req.body);
    await post.save();

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a single post by ID
router.delete('/:id', auth, async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
