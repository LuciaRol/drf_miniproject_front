import React, { useState } from 'react';
import { login } from '../services/api';  // Importa la función login desde api.js

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);  // Llamamos a la función login desde api.js
      console.log(data);  // Aquí puedes manejar el token o la respuesta de la API

      // Redirige a la página principal o guarda el token en localStorage o Context API
      localStorage.setItem('token', data.access);  // Almacenar el token en localStorage
      window.location.href = '/home';  // Redirigir a otra página

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
