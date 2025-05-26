const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  genre: { type: String, required: true },
  moodTags: [{ type: String }], // e.g., ["happy", "energetic"]
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Song', songSchema);