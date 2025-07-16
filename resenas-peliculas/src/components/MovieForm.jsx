import { useState, useEffect } from 'react';
import { moviesAPI } from '../services/api'; // ✅ Importar moviesAPI

function MovieForm({ onAdd, onUpdate, editingMovie }) {
  const [formData, setFormData] = useState({
    title: '',
    releaseYear: '',
  });

  useEffect(() => {
    if (editingMovie) {
      setFormData({
        title: editingMovie.title,
        releaseYear: editingMovie.releaseYear,
      });
    }
  }, [editingMovie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Actualizar para usar la API con autenticación
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMovie) {
        // ✅ Usar moviesAPI.updateMovie
        const response = await moviesAPI.updateMovie(editingMovie._id, formData);
        onUpdate(response.data);
      } else {
        // ✅ Usar moviesAPI.createMovie
        const response = await moviesAPI.createMovie(formData);
        onAdd(response.data);
      }
      setFormData({ title: '', releaseYear: '' });
    } catch (error) {
      console.error('Error al guardar la película:', error);
    }
  };

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h1>{editingMovie ? 'Editar Película' : ''}</h1>
      <div className="fila-horizontal">
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="releaseYear"
          placeholder="Año de estreno"
          value={formData.releaseYear}
          onChange={handleChange}
          required
        />
        <button type="submit" id="guardar">
          {editingMovie ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

export default MovieForm;