const express = require('express');
const cors = require('cors');
const connectDB = require('./database');
const app = express();
const port = 4000;

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas existentes
app.use('/api/movies', require('./routes/movies.routes'));
app.use('/api/reviews', require('./routes/reviews.routes')); // Agregado /api

// Ruta de autenticación
app.use('/api/auth', require('./routes/auth'));

// Ruta raíz para probar que funciona
app.get('/', (req, res) => {
  res.send('🎬 API de Reseñas de Películas funcionando con autenticación');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});