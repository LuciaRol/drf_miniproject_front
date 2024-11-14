import React, { useEffect, useState } from 'react';

// API URL (asegúrate de que esta sea la correcta según tu configuración)
const API_URL = 'http://localhost:8000/posts/';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los posts de la API
  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error('Error al obtener los posts');
      }

      const data = await response.json();
      setPosts(data);  // Asumiendo que los posts están en el cuerpo de la respuesta
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
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
    </div>
  );
};

export default Home;

