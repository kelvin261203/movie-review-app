import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="indexx.html" className="navbar-logo">
         ReviewScope
        </a>
      {/* <a className="nav-link text-white" href="indexx.html">Inicio</a> */}
        <div className="navbar-menu">
           
          {isAuthenticated ? (
            <>
              <span className="navbar-user">
                Hola, {user?.name}
              </span>
              <button 
                onClick={handleLogout}
                className="navbar-logout-btn"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <div className="navbar-auth-links">
              <Link to="/login" className="navbar-link">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="navbar-link">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;