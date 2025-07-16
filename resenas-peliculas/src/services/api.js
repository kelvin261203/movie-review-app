import axios from 'axios';

// ✨ Cambia el puerto a 4000 para que coincida con tu backend
const API_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (name, email, password) => api.post('/auth/register', { name, email, password }),
  getProfile: () => api.get('/auth/profile'),
};

// ✅ APIs para películas CON autenticación
export const moviesAPI = {
  getAllMovies: () => api.get('/movies'), // ✅ Usa api (con token)
  getMovie: (id) => api.get(`/movies/${id}`), // ✅ Usa api (con token)
  createMovie: (movieData) => api.post('/movies', movieData), // ✅ Crear película
  updateMovie: (id, movieData) => api.put(`/movies/${id}`, movieData), // ✅ Actualizar película
  deleteMovie: (id) => api.delete(`/movies/${id}`), // ✅ Eliminar película
};

export const reviewsAPI = {
  getAllReviews: () => api.get('/reviews'),
  getReviewsByMovie: (movieId) => api.get(`/reviews/movie/${movieId}`),
  createReview: (reviewData) => api.post('/reviews', reviewData),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
};

export default api;