const express = require('express');
const router = express.Router();
const Review = require('../Models/Review');
const auth = require('../middleware/auth'); // <-- Importar middleware

// Crear nueva reseña (PROTEGIDA)
router.post('/', auth, async (req, res) => {
  try {
    const nuevaReview = new Review({
      ...req.body,
      owner: req.userId // <-- Asignar el owner automáticamente
    });
    const guardada = await nuevaReview.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las reseñas del usuario autenticado (PROTEGIDA)
router.get('/', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ owner: req.userId }); // <-- Solo las del usuario
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener reseñas de una película específica del usuario autenticado (PROTEGIDA)
router.get('/movie/:movieId', auth, async (req, res) => {
  try {
    const reviews = await Review.find({ 
      movieId: req.params.movieId,
      owner: req.userId // <-- Solo las del usuario para esa película
    });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;