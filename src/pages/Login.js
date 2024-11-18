import React, { useState } from 'react';
import { login } from '../services/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Añade el estado isLoggedIn

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(username, password);
      console.log(data);

      localStorage.setItem('token', data.access);
      localStorage.setItem('username', username);

      // Establecer el estado de logueado en verdadero
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
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

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {isLoggedIn && <p style={{ color: 'green' }}>Login exitoso. ¡Bienvenido!</p>}  {/* Mensaje de éxito */}
    </div>
  );
};

export default Login;
