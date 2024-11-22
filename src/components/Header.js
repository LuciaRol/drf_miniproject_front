import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/header.css';  // Importa el archivo CSS

const Header = () => {
  const navigate = useNavigate();

  // Verifica si el usuario está logeado
  const isLoggedIn = localStorage.getItem('token') !== null;

  // Maneja el logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <ul className="navList">
          <li className="navItem">
            <NavLink to="/" className="navLink" activeClassName="activeNavLink">Home</NavLink>
          </li>
          {!isLoggedIn && (
            <li className="navItem">
              <NavLink to="/register" className="navLink" activeClassName="activeNavLink">Register</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <>
              <li className="navItem">
                <NavLink to="/create-post" className="navLink" activeClassName="activeNavLink">Create Post</NavLink>
              </li>
              <li className="navItem">
                <button onClick={handleLogout} className="logoutButton">Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
