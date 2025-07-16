import { useEffect, useState } from 'react';
import { reviewsAPI } from '../services/api'; // Importar tu API
import './MovieDetails.css';

function MovieDetails({ movie, onClose }) {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    author: '',
    content: '',
    rating: 5,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await reviewsAPI.getReviewsByMovie(movie._id);
        setReviews(response.data || []);
      } catch (error) {
        console.error('Error al cargar reseñas:', error);
        setError('Error al cargar las reseñas');
        setReviews([]); // Fallback a array vacío
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movie._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await reviewsAPI.createReview({
        ...newReview,
        movieId: movie._id
      });
      
      setReviews([response.data, ...reviews]);
      setNewReview({ author: '', content: '', rating: 5 });
    } catch (error) {
      console.error('Error al enviar reseña:', error);
      setError('Error al enviar la reseña');
    }
  };

  return (
    <div className="movie-details-container">
      <button onClick={onClose} className="back-button">← Volver</button>
      <h2 className="movie-title">{movie.title}</h2>
      <p className="movie-year">Año: {movie.releaseYear}</p>

      <div className="reviews-section">
        <h3 className="section-title">Reseñas</h3>
        
        {loading && <p>Cargando reseñas...</p>}
        
        {error && <p className="error-message">{error}</p>}
        
        {!loading && !error && reviews.length === 0 && (
          <p className="no-reviews">Sin reseñas aún.</p>
        )}
        
        {!loading && !error && reviews.length > 0 && (
          reviews.map((rev) => (
            <div key={rev._id} className="review-card">
              <strong>{rev.author}</strong> ({rev.rating}/5)
              <p>{rev.content}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="review-form">
        <h4 className="form-title">Agregar una reseña</h4>
        <input
          className="review-input"
          type="text"
          name="author"
          placeholder="Tu nombre"
          value={newReview.author}
          onChange={handleChange}
          required
        />
        <textarea
          className="review-textarea"
          name="content"
          placeholder="Tu opinión"
          value={newReview.content}
          onChange={handleChange}
          required
        />
        <select
          className="review-select"
          name="rating"
          value={newReview.rating}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>{n} ⭐</option>
          ))}
        </select>
        <button type="submit" className="submit-button">Enviar reseña</button>
      </form>
    </div>
  );
}

export default MovieDetails;