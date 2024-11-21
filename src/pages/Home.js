import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchPosts } from '../services/api';
import '../css/home.css'; // Importa los estilos

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si el token está presente, si no, redirigir al login
    if (!localStorage.getItem('token')) {
      navigate('/login');
    } else {
      fetchPosts()
        .then((data) => {
          setPosts(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error al obtener los posts:', error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [navigate]);

  if (loading) {
    return <div className="loading">Cargando...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <h1 className="page-title">Publicaciones</h1>
      {posts.length === 0 ? (
        <p className="no-posts">No hay posts disponibles.</p>
      ) : (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <h2 className="post-title">
                <Link to={`/posts/${post.id}`} className="post-link">{post.title}</Link>
              </h2>
              <p className="post-body">{post.body}</p>
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
