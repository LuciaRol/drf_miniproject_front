import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import '../css/login.css';  // Importa el archivo CSS

// Establecer el contenedor de la app para el modal
Modal.setAppElement('#root');

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Estado de si el usuario está logueado
  const [modalIsOpen, setModalIsOpen] = useState(false);  // Estado para el modal
  const [user, setUser] = useState('');  // Para almacenar el nombre de usuario
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(username, password);
      console.log(data);

      localStorage.setItem('token', data.access);
      localStorage.setItem('username', username);

      // Mostrar el modal de bienvenida
      setUser(username);
      setIsLoggedIn(true);
      setModalIsOpen(true);  // Abrir el modal

      // Evitar la redirección hasta que el modal se cierre
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cerrar el modal y redirigir
  const closeModal = () => {
    setModalIsOpen(false);
    navigate('/');  // Redirigir después de cerrar el modal
  };

  return (
    <div className="login-form-container">
      
      <form onSubmit={handleLogin} className="login-form">
      <h1>Inicia sesión</h1>
        <label>Username</label>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>

      {error && <p>{error}</p>}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Welcome Modal"
      >
        <h2>Bienvenido, {user}!</h2>
        <p>Has iniciado sesión correctamente.</p>
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
  );
};

export default Login;
