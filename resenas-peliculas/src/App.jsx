import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { moviesAPI } from './services/api'; // ✅ Importar moviesAPI
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';
import MovieDetails from './components/MovieDetails';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './components/Navbar';
import './App.css';

// Componente principal de películas (tu lógica existente)
const MoviesApp = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editingMovie, setEditingMovie] = useState(null);
  const { user } = useAuth();

  // ✅ Cargar películas CON autenticación
  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await moviesAPI.getAllMovies(); // ✅ Usa la API con token
        setMovies(response.data);
      } catch (error) {
        console.error('Error al cargar películas:', error);
        setMovies([]);
      }
    };

    if (user) { // ✅ Solo cargar si hay usuario autenticado
      loadMovies();
    }
  }, [user]);

  const handleAddMovie = (newMovie) => {
    setMovies([newMovie, ...movies]);
  };

  const handleUpdateMovie = (updatedMovie) => {
    setMovies(
      movies.map((m) => (m._id === updatedMovie._id ? updatedMovie : m))
    );
    setEditingMovie(null);
  };

  // ✅ Eliminar película CON autenticación
  const handleDeleteMovie = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de eliminar esta película?');
    if (!confirmDelete) return;

    try {
      await moviesAPI.deleteMovie(id); // ✅ Usa la API con token
      
      setMovies(movies.filter((m) => m._id !== id));
      if (selectedMovie && selectedMovie._id === id) {
        setSelectedMovie(null);
      }
      console.log('Película eliminada');
    } catch (error) {
      console.error('Error al eliminar la película:', error);
    }
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setSelectedMovie(null);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="app-container">
      <h1 className="titulo-principal">
        Mis Reseñas de Películas
        {user && <span className="usuario-logueado"></span>}
      </h1>
      
      {!selectedMovie ? (
        <div className="contenido-principal">
          <MovieForm
            onAdd={handleAddMovie}
            onUpdate={handleUpdateMovie}
            editingMovie={editingMovie}
          />
          <MovieList
            movies={movies}
            onSelect={handleSelectMovie}
            onDelete={handleDeleteMovie}
            onEdit={handleEditMovie}
          />
        </div>
      ) : (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

// Componente para rutas protegidas
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }
  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Componente para rutas públicas (solo accesibles si NO estás logueado)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Cargando...</div>
      </div>
    );
  }
  
  return !isAuthenticated ? children : <Navigate to="/movies" />;
};

// Componente principal de la aplicación
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/login" element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } />
            <Route path="/register" element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } />
            
            {/* Rutas protegidas */}
            <Route path="/movies" element={
              <PrivateRoute>
                <MoviesApp />
              </PrivateRoute>
            } />
            
            {/* Redirecciones */}
            <Route path="/" element={<Navigate to="/movies" />} />
            <Route path="*" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;