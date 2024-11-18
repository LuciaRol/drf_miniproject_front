// src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <NavLink to="/" style={styles.navLink} activeStyle={styles.activeNavLink}>Home</NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="/login" style={styles.navLink} activeStyle={styles.activeNavLink}>Login</NavLink>
          </li>
          <li style={styles.navItem}>
            <NavLink to="/register" style={styles.navLink} activeStyle={styles.activeNavLink}>Register</NavLink>
          </li>
          <li style={styles.navItem}> 
            <NavLink to="/create-post" style={styles.navLink} activeStyle={styles.activeNavLink}>Create Post</NavLink> 
          </li>
          <li style={styles.navItem}>
            <NavLink to="/profile" style={styles.navLink} activeStyle={styles.activeNavLink}>Profile</NavLink>
          </li>
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
};

export default Header;
