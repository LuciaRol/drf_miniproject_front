import React, { useState, useEffect } from 'react';
import { login } from '../services/api';

const API_URL = 'http://127.0.0.1:8000//posts/';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(username, password);
      console.log(data);

      localStorage.setItem('token', data.access);
      localStorage.setItem('username', username);

      await fetchPosts();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener los posts');
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error al obtener los posts:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchPosts();
    }
  }, []);

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

      {posts.length > 0 && (
        <>
          <button onClick={handleLogout}>Logout</button>
          <h1>Lista de Posts</h1>
          {posts.length === 0 ? (
            <p>No hay posts disponibles.</p>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <h2>{post.title}</h2>
                  <p>{post.body}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default Login;
