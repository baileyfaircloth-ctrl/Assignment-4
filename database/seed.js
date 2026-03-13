// Import database and model

// Seed data
const sampleTracks = [
  {
    songTitle: "Bohemian Rhapsody",
    artistName: "Queen",
    albumName: "A Night at the Opera",
    genre: "Rock",
    duration: 355,
    releaseYear: 1975
  },
  {
    songTitle: "Billie Jean",
    artistName: "Michael Jackson",
    albumName: "Thriller",
    genre: "Pop",
    duration: 294,
    releaseYear: 1982
  },
  {
    songTitle: "Stairway to Heaven",
    artistName: "Led Zeppelin",
    albumName: "Led Zeppelin IV",
    genre: "Rock",
    duration: 482,
    releaseYear: 1971
  },
  {
    songTitle: "Imagine",
    artistName: "John Lennon",
    albumName: "Imagine",
    genre: "Rock",
    duration: 183,
    releaseYear: 1971
  },
  {
    songTitle: "Like a Rolling Stone",
    artistName: "Bob Dylan",
    albumName: "Highway 61 Revisited",
    genre: "Folk Rock",
    duration: 369,
    releaseYear: 1965
  },
  {
    songTitle: "What's Going On",
    artistName: "Marvin Gaye",
    albumName: "What's Going On",
    genre: "Soul",
    duration: 232,
    releaseYear: 1971
  },
  {
    songTitle: "Purple Haze",
    artistName: "The Jimi Hendrix Experience",
    albumName: "Are You Experienced",
    genre: "Rock",
    duration: 167,
    releaseYear: 1967
  },
  {
    songTitle: "Respect",
    artistName: "Aretha Franklin",
    albumName: "I Never Loved a Man the Way I Love You",
    genre: "Soul",
    duration: 147,
    releaseYear: 1967
  },
  {
    songTitle: "Good Vibrations",
    artistName: "The Beach Boys",
    albumName: "Pet Sounds",
    genre: "Pop",
    duration: 219,
    releaseYear: 1966
  },
  {
    songTitle: "Hey Jude",
    artistName: "The Beatles",
    albumName: "Past Masters",
    genre: "Rock",
    duration: 431,
    releaseYear: 1968
  },
  {
    songTitle: "Smells Like Teen Spirit",
    artistName: "Nirvana",
    albumName: "Nevermind",
    genre: "Grunge",
    duration: 301,
    releaseYear: 1991
  },
  {
    songTitle: "I Want to Hold Your Hand",
    artistName: "The Beatles",
    albumName: "Meet the Beatles!",
    genre: "Rock",
    duration: 145,
    releaseYear: 1963
  }
];

// Seed database with sample data
// database/seed.js
require('dotenv').config();
const { sequelize, Track } = require('./setup');

// sampleTracks should be whatever array the starter repo gives you.
// Example shape:
const sampleTracks = [
  {
    songTitle: 'Song A',
    artistName: 'Artist A',
    albumName: 'Album A',
    genre: 'Pop',
    duration: 210,
    releaseYear: 2020
  },
  // ...more tracks
];

async function seed() {
  try {
    await sequelize.authenticate();
    await Track.bulkCreate(sampleTracks);   // bulkCreate for seeding[web:8]
    console.log('Database seeded.');
  } catch (err) {
    console.error('Error seeding DB:', err);
  } finally {
    await sequelize.close();
  }
}

if (require.main === module) {
  seed();
}
