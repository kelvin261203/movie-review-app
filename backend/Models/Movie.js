const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  director: { type: String },
  genre: { type: String },
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  } // Nuevo campo
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;