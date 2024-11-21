import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <NavLink to="/" style={styles.navLink} activeStyle={styles.activeNavLink}>Home</NavLink>
          </li>
          {!isLoggedIn && (
            <>
              
              <li style={styles.navItem}>
                <NavLink to="/register" style={styles.navLink} activeStyle={styles.activeNavLink}>Register</NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li style={styles.navItem}>
                <NavLink to="/create-post" style={styles.navLink} activeStyle={styles.activeNavLink}>Create Post</NavLink>
              </li>
              <li style={styles.navItem}>
                <NavLink to="/profile" style={styles.navLink} activeStyle={styles.activeNavLink}>Profile</NavLink>
              </li>
              <li style={styles.navItem}>
                <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  navList: {
    listStyleType: 'none',
    display: 'flex',
    margin: 0,
    padding: 0,
    justifyContent: 'space-around',
    backgroundColor: '#333',
  },
  navItem: {
    margin: '0 15px',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
  activeNavLink: {
    color: '#FFD700',  // Cambiar el color cuando está activo
  },
  logoutButton: {
    backgroundColor: 'transparent',
    color: 'white',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
};

export default Header;
