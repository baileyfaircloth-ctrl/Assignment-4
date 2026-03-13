// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize, Track } = require('./database/setup'); // adjust path

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// GET /api/tracks - all tracks
app.get('/api/tracks', async (req, res) => {
  try {
    const tracks = await Track.findAll();   // .findAll()[web:8]
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/tracks/:id - by primary key
app.get('/api/tracks/:id', async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);   // .findByPk()[web:8]
    if (!track) return res.status(404).json({ error: 'Track not found' });
    res.json(track);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/tracks - create track
app.post('/api/tracks', async (req, res) => {
  const { songTitle, artistName, albumName, genre, duration, releaseYear } = req.body;

  if (!songTitle || !artistName || !albumName || !genre) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newTrack = await Track.create({
      songTitle,
      artistName,
      albumName,
      genre,
      duration,
      releaseYear
    }); // .create()[web:8]
    res.status(201).json(newTrack);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/tracks/:id - update track
app.put('/api/tracks/:id', async (req, res) => {
  try {
    const [updatedCount] = await Track.update(req.body, {
      where: { trackId: req.params.id }
    }); // .update()[web:8]

    if (!updatedCount) {
      return res.status(404).json({ error: 'Track not found' });
    }

    const updatedTrack = await Track.findByPk(req.params.id);
    res.json(updatedTrack);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/tracks/:id - delete track
app.delete('/api/tracks/:id', async (req, res) => {
  try {
    const deletedCount = await Track.destroy({
      where: { trackId: req.params.id }
    }); // .destroy()[web:8]

    if (!deletedCount) {
      return res.status(404).json({ error: 'Track not found' });
    }

    res.json({ message: 'Track deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, async () => {
  // ensure DB exists when server starts
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(`Server running on port ${PORT}`);
  } catch (err) {
    console.error('Unable to start server:', err);
  }
});
