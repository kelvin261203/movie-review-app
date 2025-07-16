function MovieList({ movies, onSelect, onDelete, onEdit }) {
  return (
    <div>
      <h2 className="titulo-peliculas"></h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie._id} style={{ marginBottom: '0.5rem' }}>
            <strong>{movie.title}</strong> ({movie.releaseYear})
            <button onClick={() => onSelect(movie)} style={{ marginLeft: '0.5rem' }}>
              Ver detalles
            </button>
            <button onClick={() => onEdit(movie)} style={{ marginLeft: '0.5rem' }}>
              Editar
            </button>
            <button onClick={() => onDelete(movie._id)} style={{ marginLeft: '0.5rem' }}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
