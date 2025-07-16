import { useState } from 'react';

function ReviewForm({ onAddReview }) {
  const [user, setUser] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user || !comment) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const newReview = {
      user,
      rating: parseInt(rating),
      comment,
    };

    onAddReview(newReview);
    setUser('');
    setRating(5);
    setComment('');
  };

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3 className="review-title">Dejar una Reseña</h3>
      <input
        className="review-input"
        type="text"
        placeholder="Tu nombre"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <select
        className="review-select"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>{n} estrella{n > 1 ? 's' : ''}</option>
        ))}
      </select>

      <textarea
        className="review-textarea"
        placeholder="Comentario"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button type="submit" className="review-button">Agregar Reseña</button>
    </form>
  );
}

export default ReviewForm;
