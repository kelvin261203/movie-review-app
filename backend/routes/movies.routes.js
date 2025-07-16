const express = require('express');
const router = express.Router();
const Movie = require('../Models/Movie');
const auth = require('../middleware/auth'); // Importar middleware

// Crear una película (PROTEGIDA)
router.post('/', auth, async (req, res) => {
  try {
    const nuevaPelicula = new Movie({
      ...req.body,
      owner: req.userId //  Asignar owner automáticamente
    });
    const guardada = await nuevaPelicula.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las películas del usuario autenticado (PROTEGIDA)
router.get('/', auth, async (req, res) => {
  try {
    const movies = await Movie.find({ owner: req.userId }); // Solo las del usuario
    res.json(movies);
  } catch (err) {
    console.error('Error en GET /movies:', err);
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

// Obtener película por ID del usuario autenticado (PROTEGIDA)
router.get('/:id', auth, async (req, res) => {
  try {
    const pelicula = await Movie.findOne({ 
      _id: req.params.id, 
      owner: req.userId // Solo si es del usuario
    });
    if (!pelicula) return res.status(404).json({ message: 'No encontrada' });
    res.json(pelicula);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Actualizar película por ID del usuario autenticado (PROTEGIDA)
router.put('/:id', auth, async (req, res) => {
  try {
    const pelicula = await Movie.findOneAndUpdate(
      { _id: req.params.id, owner: req.userId }, // Solo si es del usuario
      req.body, 
      { new: true }
    );
    if (!pelicula) return res.status(404).json({ message: 'No encontrada' });
    res.json(pelicula);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Borrar película por ID del usuario autenticado (PROTEGIDA)
router.delete('/:id', auth, async (req, res) => {
  try {
    const pelicula = await Movie.findOneAndDelete({ 
      _id: req.params.id, 
      owner: req.userId // Solo si es del usuario
    });
    if (!pelicula) return res.status(404).json({ message: 'No encontrada' });
    res.json({ message: 'Película eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;