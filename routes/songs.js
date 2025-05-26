const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, async (req, res) => {
  const { title, artist, genre, moodTags } = req.body;
  if (!title || !artist || !genre || !moodTags || !Array.isArray(moodTags)) {
    return res.status(400).json({ message: 'Title, artist, genre, and moodTags are required' });
  }

  try {
    const song = new Song({ title, artist, genre, moodTags });
    await song.save();
    res.status(201).json(song);
  } catch (error) {
    res.status(500).json({ message: 'Error adding song', error });
  }
});

module.exports = router;