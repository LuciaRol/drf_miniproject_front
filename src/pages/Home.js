import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchPosts } from '../services/api';  // Asegúrate de importar la función fetchPosts

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchPosts()
        .then(data => {
          setPosts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al obtener los posts:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>Lista de Posts</h1>
      {posts.length === 0 ? (
        <p>No hay posts disponibles.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>
                <Link to={`/posts/${post.id}`}>{post.title}</Link>
              </h2>
              <p>{post.body}</p>
              <p><strong>Autor:</strong> {post.username}</p>
              <p><strong>Creado en:</strong> {new Date(post.created_at).toLocaleString()}</p>
              <p><strong>Número de comentarios:</strong> {post.comments_count != null ? post.comments_count : '0'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
