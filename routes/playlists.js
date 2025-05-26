const express = require('express');
const router = express.Router();
const Song = require('../models/song');
const Playlist = require('../models/playlist');
const authMiddleware = require('../middleware/auth');

router.post('/generate', authMiddleware, async (req, res) => {
  const { mood } = req.body;
  if (!mood) {
    return res.status(400).json({ message: 'Mood is required' });
  }

  try {
    // Find songs that match the mood
    const songs = await Song.find({ moodTags: mood }).limit(5); // Limit to 5 songs for the playlist
    if (songs.length === 0) {
      return res.status(404).json({ message: 'No songs found for this mood' });
    }

    // Create a new playlist
    const playlist = new Playlist({
      userId: req.user.id,
      mood,
      songs: songs.map(song => song._id),
    });
    await playlist.save();

    // Populate the songs for the response
    const populatedPlaylist = await Playlist.findById(playlist._id).populate('songs');
    res.status(201).json(populatedPlaylist);
  } catch (error) {
    res.status(500).json({ message: 'Error generating playlist', error });
  }
});

router.get('/my-playlists', authMiddleware, async (req, res) => {
  try {
    const playlists = await Playlist.find({ userId: req.user.id }).populate('songs');
    res.json(playlists);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlists', error });
  }
});

module.exports = router;